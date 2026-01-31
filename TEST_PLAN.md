# Test plán - Playwright projekt radimstudeny-ui-tests

**Verze**: 1.0  
**Poslední aktualizace**: 31. ledna 2026  
**Projekt**: radimstudeny-ui-tests  
**Aplikace**: Webová stránka radimstudeny.cz

---

## 1. Cíle testování

### 1.1 Primární cíle
- ✅ Zajistit funkční integritu kritických uživatelských scénářů (smoke testy)
- ✅ Detektovat regrese v existující funkcionalitě (regression testy)
- ✅ Ověřit responsivitu na různých zařízeních
- ✅ Validovat správnost uživatelské interakce
- ✅ Zajistit kompatibilitu across prohlížečů (Chrome, Firefox, Safari)

### 1.2 Sekundární cíle
- ✅ Automatizovat opakující se manuální testy
- ✅ Snížit dobu detekce chyb
- ✅ Zlepšit kvalitu vydaného kódu
- ✅ Poskytnout data pro monitoring stability aplikace

---

## 2. Rozsah testování

### 2.1 Co je zahrnuto (In Scope)
| Oblast | Popis |
|--------|-------|
| **Domovská stránka** | Načítání, validace obsahu, navigace |
| **Stránka Moje hudba** | Struktura, galerie, obsah, navigační prvky |
| **Stránka Kurzů** | Zobrazení kurzů, karty, detaily |
| **Stránka Kontaktu** | Dostupnost informací, sociální sítě, footer |
| **Navigační menu** | Viditelnost, funkčnost, přístupnost |
| **Vyhledávání a filtrování** | Formuláře, filtry, vyhledávání |
| **Detaily kurzů** | Informace, cena, zápis, moduly |
| **Responsivní design** | Mobile, tablet, desktop viewporty |
| **Uživatelská interakce** | Klikání, navigace, formuláře, dropdown, scrollování |

### 2.2 Co není zahrnuto (Out of Scope)
| Oblast | Důvod |
|--------|-------|
| **API testování** | Fokus na UI testy |
| **Bezpečnostní testy** | Vyžaduje specializovaný tým |
| **Performance testy** | Pokrýto v separátním test plánu |
| **Accessibility (WCAG)** | Budoucí rozšíření |

---

## 3. Testovací strategie

### 3.1 Pyramida testů

```
         ┌─────────────┐
         │  E2E (UI)   │  ← Regression testy (9 testů)
         ├─────────────┤
         │  Integrace  │  ← Smoke testy (18 testů)
         ├─────────────┤
         │    Unit     │  ← Budoucí
         └─────────────┘
```

### 3.2 Přístup k testování
- **Smoke testy**: Ověření základní funkcionality každé stránky
- **Regression testy**: Detailní validace funkcí a designu
- **Cross-browser**: Chrome, Firefox, WebKit
- **Parallelní běh**: Maximalizace efektivity

---

## 4. Test Suites a Coverage

### 4.1 SMOKE TESTY
**Účel**: Ověření základních scénářů kritických pro aplikaci  
**Cíl doby běhu**: < 5 minut pro vše  
**Importance**: CRITICAL

#### 4.1.1 `tests/smoke/home.spec.ts`
| Test | Popis | Čas (sec) | Priority |
|------|-------|-----------|----------|
| `homepage loads` | Ověří, že se domovská stránka načte a má správný URL | 3 | 🔴 CRITICAL |

**Počet testů**: 1  
**Očekávaný čas**: ~3 sekundy

---

#### 4.1.2 `tests/smoke/navigation.spec.ts`
| Test | Popis | Čas (sec) | Priority |
|------|-------|-----------|----------|
| `main navigation menu is visible` | Ověří viditelnost hlavního navigačního menu | 2 | 🔴 CRITICAL |
| `navigation contains home link` | Ověří, že navigace obsahuje odkaz na domovskou stránku | 2 | 🔴 CRITICAL |
| `navigate to My Music page` | Testuje navigaci na stránku "Moje hudba" | 4 | 🟠 HIGH |
| `navigate to courses/services page` | Testuje navigaci na stránku kurzů | 4 | 🟠 HIGH |

**Počet testů**: 4  
**Očekávaný čas**: ~12 sekundy

---

#### 4.1.3 `tests/smoke/my-music.spec.ts`
| Test | Popis | Čas (sec) | Priority |
|------|-------|-----------|----------|
| `should load My Music page with correct title` | Ověří načtení stránky a titul | 3 | 🟠 HIGH |
| `should display main heading` | Ověří viditelnost hlavního nadpisu | 2 | 🟠 HIGH |
| `should display content about music and programming` | Validuje obsah stránky | 2 | 🟠 HIGH |
| `should display "Software Engineer by Day, Musician by Heart" section` | Ověří konkrétní sekci | 2 | 🟠 HIGH |
| `should display information about Kowall Company` | Ověří info o společnosti | 2 | 🟠 HIGH |
| `should display information about Session band` | Ověří info o kapele | 2 | 🟠 HIGH |
| `should display gallery with musical photos` | Ověří existenci galerie | 3 | 🟠 HIGH |
| `should have multiple images in gallery` | Validuje počet obrázků v galerii | 3 | 🟠 HIGH |
| `should display navigation menu` | Ověří navigační menu | 2 | 🟠 HIGH |
| `should have working navigation links` | Testuje funkčnost odkazů | 4 | 🟠 HIGH |

**Počet testů**: 10  
**Očekávaný čas**: ~25 sekundy

---

#### 4.1.4 `tests/smoke/courses.spec.ts`
| Test | Popis | Čas (sec) | Priority |
|------|-------|-----------|----------|
| `courses page loads successfully` | Ověří načtení stránky kurzů | 3 | 🔴 CRITICAL |
| `course cards are displayed` | Ověří zobrazení karet kurzů | 3 | 🟠 HIGH |
| `course cards contain course information` | Validuje obsah karet | 2 | 🟠 HIGH |
| `course description or details are visible` | Ověří viditelnost detailů | 2 | 🟠 HIGH |

**Počet testů**: 4  
**Očekávaný čas**: ~10 sekundy

---

#### 4.1.5 `tests/smoke/contact.spec.ts`
| Test | Popis | Čas (sec) | Priority |
|------|-------|-----------|----------|
| `contact information is accessible` | Ověří přístupnost kontaktních info | 3 | 🟠 HIGH |
| `email contact is displayed on page` | Validuje emailovou adresu | 2 | 🟠 HIGH |
| `social media links are present` | Ověří přítomnost sociálních odkazů | 2 | 🟠 HIGH |
| `footer contains company information` | Ověří obsah footeru | 2 | 🟠 HIGH |

**Počet testů**: 4  
**Očekávaný čas**: ~9 sekundy

---

**SHRNUTÍ SMOKE TESTŮ**:
- ✅ Celkový počet testů: **23 testů**
- ⏱️ Celkový čas: ~59 sekundy (bez parallelizace)
- 🔴 Parallelizace: ~15 sekundy (s 4 pracovníky)

---

### 4.2 REGRESSION TESTY
**Účel**: Detekce regresí a validace komplexních scénářů  
**Cíl doby běhu**: < 10 minut pro vše  
**Importance**: HIGH

#### 4.2.1 `tests/regression/search-and-filter.spec.ts`
| Test | Popis | Čas (sec) | Priority |
|------|-------|-----------|----------|
| `search form is accessible` | Ověří dostupnost vyhledávacího formuláře | 2 | 🟡 MEDIUM |
| `can type in search field and submit` | Testuje základní vyhledávání | 4 | 🟡 MEDIUM |
| `course filters work if available` | Validuje funkčnost filtrů | 5 | 🟡 MEDIUM |
| `multiple filters can be applied` | Testuje kombinaci filtrů | 6 | 🟡 MEDIUM |
| `clear filters resets search` | Ověří reset filtrů | 3 | 🟡 MEDIUM |

**Počet testů**: 5  
**Očekávaný čas**: ~20 sekundy

---

#### 4.2.2 `tests/regression/course-details.spec.ts`
| Test | Popis | Čas (sec) | Priority |
|------|-------|-----------|----------|
| `course detail page contains all required information` | Ověří přítomnost všech požadovaných informací | 5 | 🟠 HIGH |
| `course description is complete and readable` | Validuje obsah a čitelnost popisu | 3 | 🟡 MEDIUM |
| `course pricing information is displayed` | Ověří zobrazení ceny | 2 | 🟠 HIGH |
| `course enrollment button is functional` | Testuje tlačítko pro zápis | 4 | 🟠 HIGH |
| `course modules/lessons are listed` | Ověří seznam modulů/lekcí | 3 | 🟡 MEDIUM |

**Počet testů**: 5  
**Očekávaný čas**: ~17 sekundy

---

#### 4.2.3 `tests/regression/responsive-design.spec.ts`
| Test | Popis | Čas (sec) | Priority |
|------|-------|-----------|----------|
| `homepage is responsive on mobile` | Testuje responsive design na mobilu (375x812) | 4 | 🟠 HIGH |
| `homepage is responsive on tablet` | Testuje responsive design na tabletu (768x1024) | 4 | 🟠 HIGH |
| `navigation is accessible on mobile viewport` | Ověří navigaci na mobilu | 4 | 🟠 HIGH |
| `courses page layout adapts to mobile` | Testuje layout kurzů na mobilu | 4 | 🟡 MEDIUM |
| `images are properly sized on mobile` | Validuje velikost obrázků na mobilu | 3 | 🟡 MEDIUM |

**Počet testů**: 5  
**Očekávaný čas**: ~19 sekundy

---

#### 4.2.4 `tests/regression/user-interaction.spec.ts`
| Test | Popis | Čas (sec) | Priority |
|------|-------|-----------|----------|
| `buttons are clickable and responsive` | Testuje klikatelnost tlačítek | 4 | 🟡 MEDIUM |
| `links navigate correctly` | Ověří navigaci přes odkazy | 4 | 🟠 HIGH |
| `form inputs accept user input` | Validuje vstupy formuláře | 3 | 🟡 MEDIUM |
| `dropdowns can be opened and selections made` | Testuje dropdown elementy | 4 | 🟡 MEDIUM |
| `modal/dialog can be opened and closed` | Ověří modální okna | 4 | 🟡 MEDIUM |
| `page scrolling works smoothly` | Testuje scrollování stránky | 2 | 🟡 MEDIUM |

**Počet testů**: 6  
**Očekávaný čas**: ~21 sekundy

---

**SHRNUTÍ REGRESSION TESTŮ**:
- ✅ Celkový počet testů: **21 testů**
- ⏱️ Celkový čas: ~77 sekundy (bez parallelizace)
- 🔴 Parallelizace: ~20 sekundy (s 4 pracovníky)

---

### 4.3 SETUP / SEED TESTY
**Soubor**: `tests/seed.seed.ts`  
**Účel**: Příprava testovacího prostředí a autentifikace  
**Běhová doba**: ~5-10 sekund na startu

---

## 5. Coverage matice

| Oblast aplikace | Smoke | Regression | Pokrytí |
|-----------------|-------|-----------|--------|
| Domovská stránka | ✅ 1 | ✅ 2 | 100% |
| Navigace | ✅ 4 | ✅ 1 | 100% |
| Moje hudba | ✅ 10 | ❌ 0 | 80% |
| Kurzy | ✅ 4 | ✅ 3 | 100% |
| Kontakt | ✅ 4 | ❌ 0 | 70% |
| Vyhledávání/Filtry | ❌ 0 | ✅ 5 | 60% |
| Detaily kurzů | ❌ 0 | ✅ 5 | 80% |
| Responsivní design | ❌ 0 | ✅ 5 | 100% |
| Uživatelská interakce | ❌ 0 | ✅ 6 | 85% |
| **CELKEM** | **23** | **21** | **~85%** |

---

## 6. Pořadí spouštění testů

### 6.1 Fáze 1: Setup (Paralelní běh - 1x)
1. `tests/seed.seed.ts` - Inicializace, příprava storageState

### 6.2 Fáze 2: Smoke testy (Paralelní běh - všechny)
Běží paralelně na všech prohlížečích (Chrome, Firefox, WebKit)

1. `tests/smoke/home.spec.ts`
2. `tests/smoke/navigation.spec.ts`
3. `tests/smoke/my-music.spec.ts`
4. `tests/smoke/courses.spec.ts`
5. `tests/smoke/contact.spec.ts`

### 6.3 Fáze 3: Regression testy (Paralelní běh - všechny)
Běží paralelní na všech prohlížečích po úspěšných smoke testech

1. `tests/regression/search-and-filter.spec.ts`
2. `tests/regression/course-details.spec.ts`
3. `tests/regression/responsive-design.spec.ts`
4. `tests/regression/user-interaction.spec.ts`

### 6.4 Konfigurace paralelizace
```json
{
  "fullyParallel": true,
  "retries": 1,
  "workers": 4,
  "timeout": 30000
}
```

---

## 7. Očekávané časy běhu

### 7.1 Časy pro jednotlivé běhy

| Scénář | Testy | Čas (bez retry) | Čas (s retry) | Pozn. |
|--------|-------|-----------------|---------------|-------|
| **SmokeOnly** | 23 | ~15 sec | ~25 sec | Nejrychlejší check |
| **Regression Only** | 21 | ~20 sec | ~35 sec | Detailní validace |
| **Všechny** | 44 | ~30 sec | ~50 sec | Full check |
| **Multi-browser** | 44 × 3 | ~90 sec | ~150 sec | Chrome + Firefox + WebKit |
| **Full Suite** | 44 × 3 + Retry | - | ~180 sec | Kompletní běh |

### 7.2 Kdy běží jaké testy

| Trigger | Co běží | Čas | Frekvence |
|---------|--------|-----|-----------|
| **Pull Request** | Smoke | ~5 min | Na každý PR |
| **Pre-release** | Smoke + Regression | ~15 min | Před release |
| **Nightly** | Všechny × 3 browsery | ~3-5 min | Každou noc |
| **Manual** | Vybran user | Variabilní | On-demand |

---

## 8. Analýza rizik

### 8.1 Identifikovaná rizika

| Riziko | Pravděpodobnost | Dopad | Kritičnost | Mitigation |
|--------|-----------------|-------|-----------|-----------|
| **Flaky testy** | STŘEDNÍ | VYSOKÝ | 🔴 VYSOKÁ | Implementovat `expect.waitFor()` a zvýšit timeout |
| **Změny v DOM** | NÍZKÁ | VYSOKÝ | 🔴 VYSOKÁ | Maintenance window, code review |
| **Network timeouts** | STŘEDNÍ | STŘEDNÍ | 🟠 STŘEDNÍ | Retry policy, lepší network handling |
| **Browser incompatibility** | NÍZKÁ | STŘEDNÍ | 🟠 STŘEDNÍ | Cross-browser testing, vendor specifics |
| **Test data corruption** | VELMI NÍZKÁ | VYSOKÝ | 🔴 VYSOKÁ | Seed testy, isolace testů |
| **Performance degradation** | STŘEDNÍ | STŘEDNÍ | 🟠 STŘEDNÍ | Performance monitoring, thresholds |
| **Resource exhaustion** | NÍZKÁ | STŘEDNÍ | 🟠 STŘEDNÍ | Resource cleanup, worker management |

### 8.2 Strategie mitigace rizik
- ✅ Všechny testy mají výslovné wait podmínky (bez sleep)
- ✅ Retry politika: 1 retry pro flaky testy
- ✅ Seed mechanismus pro připravené testovací stavy
- ✅ Paralelní běh omezen na 4 workery
- ✅ Timeout nastaveny na 10-30 sekund (rozumné hodnoty)

---

## 9. Metriky a KPIs

### 9.1 Primární metriky

| KPI | Cílová hodnota | Frekvence měření | Akce |
|-----|-----------------|-----------------|------|
| **Pass Rate** | ≥ 95% | Každý běh | Alert < 90% |
| **Avg. Runtime** | ≤ 180 sec | Denně | Optimize pokud > 300 sec |
| **Flaky Test Ratio** | < 5% | Týdně | Rewrite pokud > 10% |
| **Bug Detection Rate** | > 2 bugs/měsíc | Měsíčně | Rozšířit scope |
| **Coverage** | ≥ 85% | Měsíčně | Přidat testy pro nové features |

### 9.2 Sekundární metriky

| Metrika | Popis | Cíl |
|---------|-------|-----|
| **MTTR** | Mean Time To Repair | < 4 hodiny |
| **Test Maintenance** | % času na údržbu testů | < 20% |
| **ROI** | Return on Investment | > 3x |
| **Browser Coverage** | % testů běžících na všech browserech | 100% |

### 9.3 Reporting a Dashboard
- **Jenkins/CI Pipeline**: Notifikace při selhání
- **HTML Report**: Podrobný report po každém běhu
- **JUnit XML**: Integrace s external tools
- **Slack Integration**: Alerts pro kritické selhání

---

## 10. Strategie údržby testů

### 10.1 Běžná údržba
- **Týdně**: Review flaky testů, aktualizace selektorů
- **Měsíčně**: Audit coverage, optimalizace
- **Ročně**: Strategie review, modernizace

### 10.2 Best Practices (dle AGENTS.md)
- ✅ Preferovat `getByRole()` a `getByText()` přes CSS selektory
- ✅ Nikdy nepoužívat `nth-child()`
- ✅ Bez `sleep()`, používat `expect().toWaitFor()`
- ✅ Testy běží paralelně
- ✅ Smoke testy musí být rychlé (< 1 sec za test)
- ✅ Vždy volat `acceptCookiesIfPresent(page)` při prvním load
- ✅ TypeScript Only
- ✅ Jeden scénář per test

---

## 11. Exit kritéria

### 11.1 Test Suite Ready (Greenlight)
- ✅ Všechny testy `PASS` na všech 3 browserech
- ✅ Čas běhu ≤ 180 sekund (Full suite)
- ✅ Flaky ratio < 5%
- ✅ Code review aprobován
- ✅ Coverage ≥ 85%

### 11.2 Deployment Release (Pre-Production)
- ✅ Smoke testy 100% `PASS`
- ✅ Regression testy 100% `PASS`
- ✅ Bez znám flaky testů
- ✅ Performance baseline met
- ✅ Release notes updated

### 11.3 Critical Issues (Stop Release)
- 🛑 Pass rate < 90%
- 🛑 Regression v existing features
- 🛑 Dopad na bezpečnost/data
- 🛑 Network timeouts > 50%

---

## 12. Konfigurační detaily

### 12.1 Test prostředí
```json
{
  "baseURL": "https://www.radimstudeny.cz/",
  "browsers": ["chromium", "firefox", "webkit"],
  "fullyParallel": true,
  "workers": 4,
  "retries": 1,
  "timeout": 30000,
  "actionTimeout": 10000,
  "expect": {
    "timeout": 5000
  }
}
```

### 12.2 Reporter konfigurace
```json
{
  "reporters": [
    ["list"],
    ["html", { "open": "never" }],
    ["junit", { "outputFile": "artifacts/junit-results.xml" }]
  ]
}
```

### 12.3 Artifact collection
- 📸 **Screenshots**: Pouze při selhání
- 🎥 **Video**: Uchováno pouze při selhání
- 📊 **Trace**: On-first-retry
- 📝 **Logs**: Ve výstupní zprávě

---

## 13. Příručka spouštění testů

### 13.1 Místní spouštění
```bash
# Všechny testy
npm test

# Pouze smoke testy
npm test -- tests/smoke

# Pouze regression testy  
npm test -- tests/regression

# S UI mode
npm run test:ui

# Headed mode
npm run test:headed

# Zobrazit report
npm run test:report
```

### 13.2 CI/CD Pipeline
```yaml
stages:
  - setup: npm run playwright:install
  - smoke: npm test -- tests/smoke
  - regression: npm test -- tests/regression
  - report: npm run test:report
```

---

## 14. Dodatečné zdroje

### 14.1 Dokumentace
- [Playwright Docs](https://playwright.dev)
- [Project AGENTS.md](AGENTS.md)
- [Test Fixtures](tests/fixtures/helpers.ts)

### 14.2 Kontakty
- **QA Lead**: [Dle týmu]
- **Dev Lead**: [Dle týmu]
- **Product Owner**: [Dle týmu]

### 14.3 Schválení
| Role | Jméno | Datum | Podpis |
|------|-------|-------|--------|
| QA Lead | - | - | - |
| Dev Lead | - | - | - |
| Product Owner | - | - | - |

---

## Přílohy

### A. Glosář
- **Smoke Test**: Základní sanity check kritických funkcí
- **Regression Test**: Detailní validace, detekce regresí
- **Flaky Test**: Test, který někdy selhává, někdy ne
- **Seed**: Přípravné data a stav pro testy
- **Coverage**: % prvků aplikace pokrytých testy
- **E2E**: End-to-end test - simulace reálného uživatele

### B. Příklady výstupů
```
Parallel Suite Summary:
├─ Smoke Tests: 23 testů ✅ 23 PASS
├─ Regression Tests: 21 testů ✅ 21 PASS
├─ Browsers: 3 (Chrome, Firefox, WebKit)
├─ Runtime: 2m 45sec
├─ Pass Rate: 100%
└─ Status: ✅ READY FOR RELEASE
```

---

**Dokument schválila**: QA Tým  
**Poslední revize**: 31. ledna 2026  
**Verze**: 1.0
