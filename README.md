
# Robot Framework Project

## 📁 Project Structure

This project follows a strict and organized directory structure to maintain clarity, scalability, and maintainability across all Robot Framework test suites.

```
project-root/
│
├── Resources/
│   ├── PO/                  # Page Object files (element locators per screen)
│   ├── Keywords/            # Reusable keywords (organized as needed)
│   └── Common.robot         # Common keywords used across test cases
│
├── Tests/                   # Test case files per screen/module
│
├── Results/                 # Stores execution logs, reports, and output files
│
└── HTML/                    # HTML files of the tested pages for element reference
```

---

## 📌 Directory Details

### `Resources/`
- **`PO/`**:  
  Contains screen-specific Page Object files. Each screen must have its own `.robot` file defining element locators.

- **`Keywords/`**:  
  Contains modular and reusable keyword files. Group related actions per functionality (e.g., login, navigation, validations).

- **`Common.robot`**:  
  A centralized file for generic keywords used across multiple test cases and screens.

### `Tests/`
- Each screen/module must have its own dedicated test case file.
- Naming should reflect the screen's purpose to aid quick identification.

### `Results/`
- Stores Robot Framework’s output files (`output.xml`, `log.html`, `report.html`, etc.)
- Each test run result should be saved here.

### `HTML/`
- Stores raw HTML copies of each page under test.
- Used as reference to locate and verify element positions.

---

## 🔍 Element Locator Strategy

- **Primary locator**: `id`  
- **Fallback locator**: `xpath`  

> All Page Object definitions must follow this priority rule to ensure consistency and resilience in element identification.

---

## ✅ Best Practices

- Use descriptive and consistent naming conventions.
- Reuse common keywords via `Common.robot` to avoid duplication.
- Keep Page Object files focused on locators only; all actions should be in keyword files.
- Store one `.robot` file per screen for both PO and test case to enforce modularity.


## General Project Rules

1. "ID" should always be used as element locator
2. "xpath" should be used in case "ID" not found