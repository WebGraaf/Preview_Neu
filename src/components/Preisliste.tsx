import { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DataRow {
  name: string;
  fahrstunde: number;
  grundgebuehr: number;
  sonderfahrt: number;
}

export function Preisliste() {
  const [sortKey, setSortKey] = useState<keyof DataRow>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const sectionRef = useRef<HTMLElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const data: DataRow[] = [
    { name: 'AM', fahrstunde: 45, grundgebuehr: 150, sonderfahrt: 60 },
    { name: 'A1', fahrstunde: 50, grundgebuehr: 200, sonderfahrt: 65 },
    { name: 'A2', fahrstunde: 55, grundgebuehr: 250, sonderfahrt: 70 },
    { name: 'A', fahrstunde: 60, grundgebuehr: 300, sonderfahrt: 75 },
    { name: 'BF17', fahrstunde: 40, grundgebuehr: 120, sonderfahrt: 50 },
    { name: 'B', fahrstunde: 45, grundgebuehr: 180, sonderfahrt: 55 },
    { name: 'B96', fahrstunde: 42, grundgebuehr: 160, sonderfahrt: 52 },
    { name: 'BE', fahrstunde: 50, grundgebuehr: 220, sonderfahrt: 60 },
    { name: 'B196', fahrstunde: 47, grundgebuehr: 190, sonderfahrt: 57 },
    { name: 'B197', fahrstunde: 46, grundgebuehr: 185, sonderfahrt: 56 },
    { name: 'C1', fahrstunde: 55, grundgebuehr: 250, sonderfahrt: 70 },
    { name: 'C1E', fahrstunde: 60, grundgebuehr: 280, sonderfahrt: 75 },
    { name: 'C', fahrstunde: 65, grundgebuehr: 320, sonderfahrt: 80 },
    { name: 'CE', fahrstunde: 70, grundgebuehr: 350, sonderfahrt: 85 },
    { name: 'D1', fahrstunde: 60, grundgebuehr: 300, sonderfahrt: 75 },
    { name: 'D1E', fahrstunde: 65, grundgebuehr: 330, sonderfahrt: 80 },
    { name: 'D', fahrstunde: 70, grundgebuehr: 380, sonderfahrt: 85 },
    { name: 'DE', fahrstunde: 75, grundgebuehr: 420, sonderfahrt: 90 },
    { name: 'L', fahrstunde: 35, grundgebuehr: 100, sonderfahrt: 45 },
    { name: 'T', fahrstunde: 40, grundgebuehr: 130, sonderfahrt: 50 }
  ];

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const modifier = sortOrder === 'asc' ? 1 : -1;

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal) * modifier;
    }
    return (Number(aVal) - Number(bVal)) * modifier;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Consolidate all animations into a single timeline with one ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate title
      tl.fromTo(".price-title",
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }
      );

      // Animate table container (simplified - removed scale animation)
      tl.fromTo(tableRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        },
        "-=0.3"
      );

      // Animate pagination
      tl.fromTo(paginationRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSort = (key: keyof DataRow) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ column }: { column: keyof DataRow }) => {
    if (sortKey !== column) return <ChevronsUpDown className="w-4 h-4 text-primary-400" />;
    return sortOrder === 'asc' ?
      <ChevronUp className="w-4 h-4 text-primary-600" /> :
      <ChevronDown className="w-4 h-4 text-primary-600" />;
  };

  // Mobile card view for each row
  const MobileCard = ({ row }: { row: DataRow }) => (
    <div className="bg-background-card rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">
          Klasse {row.name}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="text-center p-2 bg-neutral-50 rounded-lg">
          <p className="text-muted text-xs mb-1">Fahrstunde</p>
          <p className="font-semibold text-heading">{row.fahrstunde} €</p>
        </div>
        <div className="text-center p-2 bg-neutral-50 rounded-lg">
          <p className="text-muted text-xs mb-1">Grundgebühr</p>
          <p className="font-semibold text-heading">{row.grundgebuehr} €</p>
        </div>
        <div className="text-center p-2 bg-primary-50 rounded-lg">
          <p className="text-muted text-xs mb-1">Sonderfahrt</p>
          <p className="font-semibold text-status-success">{row.sonderfahrt} €</p>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="price-title text-3xl md:text-4xl font-bold text-heading mb-4">
            Preisliste Fahrschulen
          </h2>
          <p className="text-text max-w-2xl mx-auto">
            Transparente Preise für alle Führerscheinklassen
          </p>
        </div>

        {/* Mobile Card View */}
        <div ref={tableRef} className="md:hidden space-y-3" style={{ willChange: 'transform, opacity' }}>
          {paginatedData.map((row, index) => (
            <MobileCard key={index} row={row} />
          ))}
        </div>

        {/* Desktop Table View */}
        <div ref={tableRef} className="hidden md:block price-table bg-background-card rounded-2xl shadow-xl border border-border overflow-hidden" style={{ willChange: 'transform, opacity' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-neutral-100 to-neutral-100 border-b-2 border-border">
                <tr>
                  <th
                    onClick={() => handleSort('name')}
                    className="px-6 py-5 text-left font-bold text-primary-900 cursor-pointer hover:bg-interaction-hover transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-2">
                      <span>Führerschein-Klasse</span>
                      <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                        <SortIcon column="name" />
                      </span>
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('fahrstunde')}
                    className="px-6 py-5 text-right font-bold text-primary-700 cursor-pointer hover:bg-interaction-hover transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-end gap-2">
                      <span>Fahrstunde (€)</span>
                      <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                        <SortIcon column="fahrstunde" />
                      </span>
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('grundgebuehr')}
                    className="px-6 py-5 text-right font-bold text-primary-700 cursor-pointer hover:bg-interaction-hover transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-end gap-2">
                      <span>Grundgebühr (€)</span>
                      <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                        <SortIcon column="grundgebuehr" />
                      </span>
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('sonderfahrt')}
                    className="px-6 py-5 text-right font-bold text-primary-700 cursor-pointer hover:bg-interaction-hover transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-end gap-2">
                      <span>Sonderfahrt (€)</span>
                      <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                        <SortIcon column="sonderfahrt" />
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-interaction-hover transition-all duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 font-semibold text-heading">
                        <span className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700 text-sm font-bold group-hover:bg-primary-200 transition-colors">
                          {row.name}
                        </span>
                        <span className="text-muted">Klasse {row.name}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-heading font-medium">{row.fahrstunde} €</td>
                    <td className="px-6 py-4 text-right font-semibold text-heading">{row.grundgebuehr} €</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-status-success font-semibold">
                        {row.sonderfahrt} €
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div ref={paginationRef} className="price-pagination bg-gradient-to-r from-background-card to-neutral-50 px-6 py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted">
              Zeige <span className="font-semibold text-heading">{(currentPage - 1) * itemsPerPage + 1}</span> bis <span className="font-semibold text-heading">{Math.min(currentPage * itemsPerPage, sortedData.length)}</span> von <span className="font-semibold text-heading">{sortedData.length}</span> Einträgen
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-neutral-300 rounded-xl text-heading hover:bg-neutral-100 hover:border-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Vorherige
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl font-semibold transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'border border-neutral-300 text-heading hover:bg-neutral-100 hover:border-neutral-400'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-neutral-300 rounded-xl text-heading hover:bg-neutral-100 hover:border-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Nächste
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Pagination */}
        <div ref={paginationRef} className="md:hidden mt-6 flex flex-col items-center gap-4">
          <div className="text-sm text-muted">
            Seite {currentPage} von {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-neutral-300 rounded-xl text-heading hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Vorherige
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-neutral-300 rounded-xl text-heading hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Nächste
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}