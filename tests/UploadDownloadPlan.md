# Upload Download Test Plan

## Application Overview

Test plan for upload-download functionality on the Rahul Shetty Academy practice page

## Test Scenarios

### 1. Core Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Download file

**File:** `tests/download.spec.ts`

**Steps:**
  1. Click Download button
    - expect: File downloads as download.xlsx
    - expect: File contains Excel data
  2. Verify file contents
    - expect: File has 6 fruit rows
    - expect: Data matches table

#### 1.2. Upload file

**File:** `tests/upload.spec.ts`

**Steps:**
  1. Click Choose File button
    - expect: File input dialog opens
  2. Select and upload Excel file
    - expect: File uploads successfully
    - expect: No error messages

#### 1.3. Table sorting

**File:** `tests/sort.spec.ts`

**Steps:**
  1. Click Fruit Name column header
    - expect: Table sorts alphabetically by fruit name
  2. Click Price column header
    - expect: Table sorts by price numerically

#### 1.4. Pagination

**File:** `tests/pagination.spec.ts`

**Steps:**
  1. Click rows per page dropdown
    - expect: Dropdown shows options: 10,15,20,25,30
  2. Select 15 rows per page
    - expect: Selection updates to 15
