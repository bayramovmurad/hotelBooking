# Hotel Booking System – Frontend Application

This project is an interactive hotel booking interface that allows users to configure a trip, select hotels and meals for each day, and view a complete pricing summary. The system has been built using **React**, **Redux Toolkit**, and **TailwindCSS**, and is designed to follow real-life booking logic.

---

## 🚀 Features

### **1. Initial Trip Setup**
Users can configure:
- Citizenship  
- Start date  
- Number of days  
- Destination country  
- Board type (Full Board, Half Board, No Board)

### **2. Daily Configuration**
Based on the selected number of days, a dynamic table is generated.  
Each day includes:
- Hotel selection  
- Meal options (based on board type)

### **Board Type Rules**
| Board Type | Lunch | Dinner | Notes |
|-----------|--------|--------|-------|
| **Full Board (FB)** | ✔ | ✔ | Both meals allowed |
| **Half Board (HB)** | ✔ | ✔ (but one only) | Lunch and dinner are mutually exclusive |
| **No Board (NB)** | ✘ | ✘ | Meals are disabled |

Meal logic is enforced both in the UI and in the global application state.

---

## 📊 Summary & Pricing

The application provides a detailed summary section that includes:

### **Configuration Overview**
- Citizenship  
- Destination  
- Dates  
- Board type  

### **Daily Breakdown**
For each day:
- Selected hotel & price  
- Selected meals & price  
- Day total  

### **Total Price Calculation**

Total = Σ (Hotel Price + Selected Meal Prices) for all days

---

## 🛠 Tech Stack

- **React**
- **Redux Toolkit**
- **React-Redux**
- **TailwindCSS**
- **Vite**

The codebase follows a clean architecture with clear separation between components, slices, data, and pages.

---

