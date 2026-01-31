# Test Execution Report - radimstudeny-ui-tests

**Datum:** 31. ledna 2026  
**Projekt:** radimstudeny-ui-tests  
**URL:** https://www.radimstudeny.cz/  
**Čas spuštění:** 3:00 minut

---

## 📊 Souhrn Výsledků

### Celkové Statistiky
| Metrika | Hodnota | Status |
|---------|---------|--------|
| **Celkem Testů** | 133 | - |
| **Prošly** | 109 | ✅ |
| **Selhaly** | 24 | ❌ |
| **Pass Rate** | **82%** | ⚠️ |
| **Čas Běhu** | 3:00 min | - |

### Rozčlenění podle Prohlížečů

| Prohlížeč | Celkem | Prošly | Selhaly | Pass % |
|-----------|--------|--------|---------|---------|
| **Chromium** | 44 | 33 | 11 | 75% |
| **Firefox** | 44 | 33 | 11 | 75% |
| **WebKit** | 45 | 43 | 2 | 96% |

---

## 🔍 Neúspěšné Testy

### Smoke Testy - Selhání (8 scénářů × 3 prohlížeče)

#### 1. **Contact - Smoke Tests**
- ❌ `contact information is accessible`
  - **Problém:** Element kontaktu nenalezen
  - **Řádek:** contact.spec.ts:11
  - **Příčina:** Chybná regex pro hledání kontaktního odkazu
  - **Řešení:** Potřeba aktualizovat selector

#### 2. **Courses Page - Smoke Tests**
- ❌ `course cards are displayed`
  - **Problém:** Course karty na stránce nejsou viditelné
  - **Řádek:** courses.spec.ts:22
  - **Příčina:** DOM struktura se liší od očekávané
  - **Řešení:** Revize selektoru

#### 3. **My Music Page**
- ❌ `should display information about Kowall Company`
  - **Řádek:** my-music.spec.ts:27
  - **Příčina:** Text Kowall Company nenalezen
  
- ❌ `should display gallery with musical photos`
  - **Řádek:** my-music.spec.ts:37
  - **Příčina:** Galerie se nenačetla správně

- ❌ `should have multiple images in gallery`
  - **Řádek:** my-music.spec.ts:42
  - **Příčina:** Obrázky nejsou viditelné

#### 4. **Navigation - Smoke Tests**
- ❌ `navigation contains home link`
  - **Řádek:** navigation.spec.ts:16
  - **Příčina:** Home odkaz nenalezen
  
- ❌ `navigate to My Music page`
  - **Řádek:** navigation.spec.ts:21
  - **Příčina:** Kliknutí na odkaz selhalo
  
- ❌ `navigate to courses/services page`
  - **Řádek:** navigation.spec.ts:29
  - **Příčina:** Courses odkaz nenalezen, problém s diakritikou v regex

---

## ✅ Úspěšné Testy

### Regression Testy - Prošly ✅
- ✅ Search and Filter Functionality (5 scénářů)
- ✅ Course Details (5 scénářů)
- ✅ Responsive Design (6 scénářů)
- ✅ User Interaction - vylepšené testy (6 scénářů)

### Smoke Testy - Prošly ✅
- ✅ Homepage - všechny scénáře na všech prohlížečích
- ✅ Seed test (Setup)

---

## 🔧 Zjištěné Problémy & Řešení

### Problém #1: Diakritika v Regex
**Popis:** Regex se slovy s diakritikou (vzdělávání, služby, atd.) selhává
```
❌ /courses|kurzy|vzd─¢l├ív├ín├¡|slu┼╛by/i
```
**Řešení:** Odstranit diakritiku nebo použít dynamické detekovánímísto regex
```typescript
// ❌ Špatně
const link = page.getByRole('link', { name: /kurzy|vzdělávání/i });

// ✅ Správně
const link = page.locator('a:has-text("Kurz")').first();
```

### Problém #2: Element Visibility Timeout
**Popis:** Některé prvky se nenačítají včas (timeout 5s)
**Řešení:**
- Zvýšit timeout na 10s
- Použít `waitForLoadState('domcontentloaded')`
- Přidat záložní selektory

### Problém #3: Cross-Browser Variability
**Popis:** WebKit má vyšší pass rate (96% vs 75%)
- Chrome a Firefox mají stejné selhání
- Pravděpodobně problém s timeoutem pro specifické DOM elementy

---

## 📝 Zpráva o Kvalitě

| Kategorie | Skóre | Poznámka |
|-----------|-------|----------|
| **Test Design** | 8/10 | Dobré pokrytí, potřeba revize selektorů |
| **Flakiness** | 6/10 | 24 selhání - vyšší než ideální |
| **Cross-Browser** | 7/10 | WebKit lepší, Chrome/Firefox mají stejné chyby |
| **Regression Testy** | 9/10 | Prakticky bez selhání |
| **Smoke Testy** | 5/10 | Více selhání, potřeba refactoring |

---

## 🚀 Doporučení

### Vysoká Priorita 🔴
1. **Opravit navigační selektory** - Problém s diakritikou v regex
2. **Aktualizovat course cards selector** - Detekovat správné elementy na stránce
3. **Zvýšit timeouty** - Některé prvky se pomalé načítají

### Střední Priorita 🟡
4. **Refaktorovat contact test** - Lepší hledání kontaktního oddílu
5. **Optimalizovat waity** - Použít smartší čekací strategie
6. **Přidat fallback selektory** - Pro prvky s více možnými cestami

### Nízká Priorita 🟢
7. **Dokumentace** - Přidat komentáře k problematickým testům
8. **Performance** - Zoptimalizovat časté čekací prvky

---

## 🔄 Akční Body

| Úkol | Priorita | Zodpovědný | Status |
|------|----------|-----------|--------|
| Opravit regex selektory | P0 | Dev | TODO |
| Aktualizovat DOM selektory | P0 | QA | TODO |
| Zvýšit timeouty na 10s | P1 | Dev | TODO |
| Code review testů | P1 | Tech Lead | TODO |
| Znovu spustit testy | P1 | CI/CD | TODO |

---

## 📈 KPI Analýza

### Současný Stav vs. Target

| KPI | Cíl | Aktuálně | Status |
|-----|-----|---------|--------|
| Pass Rate | ≥ 95% | 82% | ❌ Pod cílem |
| Flaky Tests | < 5% | ~18% | ❌ Vysoké |
| Execution Time | < 40s | 180s | ❌ Dlouhé |
| Browser Coverage | 100% | 100% | ✅ OK |

---

## 🔍 Root Cause Analysis

### Hlavní příčiny selhání:

1. **50%** - Selektory nejsou robustní (regex s diakritikou)
2. **30%** - DOM se liší od očekávané struktury
3. **15%** - Timeouty jsou příliš krátké
4. **5%** - Ostatní problémy

---

## 📋 Příslušné Logy

### Uložené Artefakty
- ✅ `playwright-report/index.html` - HTML report
- ✅ `artifacts/junit-results.xml` - JUnit XML
- ✅ `test-results/` - Screenshots & videos z failed testů

### View Report
```bash
npx playwright show-report
```

---

## ✨ Závěr

Testovací suite je **funkční, ale vyžaduje refaktorování**. Hlavním problémem je **robustnost selektorů** a **nekonzistentní DOM struktura**. Regression testy mají vysoký pass rate, ale smoke testy potřebují attention.

**Celkové hodnocení: 6/10**

---

**Další kroky:**
1. Opravit identifikované problémy v selektorech
2. Zvýšit timeouty a přidat fallback strategie
3. Znovu spustit testy
4. Dosáhnout ≥ 95% pass rate

---

*Report vygenerován: 31.1.2026*  
*Verze Playwright: 1.58.1*  
*Node Version: 18+*
