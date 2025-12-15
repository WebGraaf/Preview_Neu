# Kilo AI Rules

## Prompt-Erkennung

### 1) Anpassung an bestehender Seite
Wenn im Prompt steht: `## Mache eine Anpassung auf der Seite *` (das `*` ist ein Platzhalter; die konkrete `.tsx` Datei kommt aus dem `/pages` Ordner), dann soll der Agent eine bestehende Seite anpassen (vermutlich Inhalt, wenn nichts weiter angegeben wurde).

Direkt darunter steht: `### Kunden Informationen:`  
Ab hier kommen die Anforderungen/Informationen für die Anpassung (meist Stichpunkte oder kompakt).

Pflichten:
- Die Informationen sinnvoll aufbereiten und auf der angegebenen Seite einbauen.
- Wenn es noch keine Informationen zu dieser Anpassung auf der Seite gibt, dann entscheiden, ob:
  - rein textlich eingebaut wird, oder
  - mit einem Element aus `src\components` gefüllt wird.
- Wenn nicht explizit angegeben: keine Elemente mit Bildern nutzen.
- Am besten nur Text oder Elemente mit Icons nutzen.
- Elemente so nutzen, dass sie herauskopiert werden (nicht die `/components` Datei bearbeiten und dann darauf verweisen).
- Alle Elemente müssen dem selben Stil der Website entsprechen.
- Es sollen nur Farben genutzt werden, die in der `tailwind.config.js` definiert sind.
- Abstände und Animationen müssen denen entsprechen, wie sie auf der Seite bei anderen Elementen bereits implementiert sind.
- Anpassung muss Desktop & mobil optimiert sein.
- Es darf niemals gelogen werden oder etwas hinzugedichtet werden.
- Es dürfen immer nur die Informationen aus dem Bereich `### Kunden Informationen:` genutzt werden.
- Immer duzen.
- Falls Texte persönlicheren Touch brauchen: in `kunde_informationen.md` schauen (dort steht wie die Fahrschule heißt). Meist sind diese Informationen jedoch bereits irgendwo auf der Seite zu finden.

---

### 2) Neue Seite erstellen
Wenn im Prompt folgender Text zu finden ist: `## Erstelle eine Neue Seite mit dem Namen *`, dann muss eine komplett neue Seite erstellt werden.

Direkt darunter steht: `### Kunden Informationen:`  
Ab hier kommen die Anforderungen/Informationen für die neue Seite.

Vorlagen:
- `src\pages\VorlageGemischt.tsx`
- `src\pages\VorlageKreativ1.tsx`
- `src\pages\VorlageKreativ2.tsx`
- `src\pages\VorlageTextFokus.tsx`

Pflichten:
- Vorlagen nutzen, um eine neue Seite zu erstellen.
- Entscheiden, welche Vorlage am besten zu den Informationen passt.
- Vorlage-Seiten selbst dürfen nicht bearbeitet werden; es muss eine neue Seite eingerichtet werden.
- Bei der Erstellung der neuen Seite ausschließlich die übergebenen Informationen nutzen.
- Es darf nicht gelogen werden.
- Inhalt nett, freundlich, einladend und informativ gestalten.
- Da es sich um eine Seite handelt, können allgemeine Texte hinzugefügt werden, welche allgemein gültig sind ohne zu lügen, um die Seite schöner zu gestalten.
- Bei Bedarf können andere Elemente aus dem `/components` Ordner genutzt werden.
  - Diese Elemente nur herauskopieren und einfügen, falls sie besser passen.
  - Wenn nicht angegeben: keine Elemente mit Bildern nutzen.
- Am Ende jeder neuen Seite muss der `banneranmelden` Banner implementiert werden:
  - Dieser darf als Verweis aus der `/components` Datei eingefügt werden, sodass er global geändert werden kann.
  - Das ist eine Ausnahme; alle anderen Elemente dürfen nicht als Verweis genutzt werden, sondern müssen kopiert werden.
- Für neue Seiten:
  - Meta Tags bearbeiten, entsprechend der angegebenen URL.
  - Sitemap anpassen.

---

### 3) Header-Struktur überarbeiten
Wenn sich im Prompt der Hinweis befindet: `## Zum Schluss überarbeite die Header Struktur`, dann wird die Header-Struktur in einer `.md` Datei übergeben.

Regeln:
- In der `.md` steht, wie der Header aussehen soll und welche Seiten sich im Header wo befinden sollen (von oben nach unten).
- Ausnahme ist immer die `Anmelden` Seite:
  - als eigenständiger Button rechts.
- Hierarchie:
  - beginnt bei `##` und dahinter einem Namen und einer Info `[ Info ]`.
- Bedeutungen:
  - `[MAIN]`: Seite im Header direkt anzeigen. Passenden kurzen Namen bei Bedarf ableiten, falls eine neue Seite eingefügt werden muss.
  - `[MAIN][NOPAGE]`: Header-Element ohne Link, dient nur als Dropdown für darunterfolgende Subpages.
  - `[SUB]`: Subpage, immer im Dropdown anzeigen unter dem Objekt, dem es in der `.md` hierarchisch untergeordnet ist.
- Bedenken:
  - Einige Header-Objekte sind mit der `public\fahrschule-config.json` verknüpft; dies muss beibehalten werden.
  - Neue Seiten sollen unabhängig der JSON in den Header gepackt werden.
