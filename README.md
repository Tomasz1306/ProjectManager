# 📁 ProjectManager

**ProjectManager** to kompleksowa aplikacja webowa służąca do zarządzania projektami. Umożliwia tworzenie, śledzenie i zarządzanie zadaniami, członkami zespołu oraz etapami realizacji projektów w czasie rzeczywistym.

---

## 🚀 Technologie

### Frontend
- [Next.js](https://nextjs.org/)
- TypeScript
- Tailwind CSS

### Backend
- Java 17+
- Spring Boot
- Spring Framework
- Spring Security (JWT)
- Hibernate
- Maven

### Baza Danych
- PostgreSQL

---

## 🔧 Funkcje

- ✅ Rejestracja i logowanie użytkowników (z uwierzytelnianiem JWT)
- 📋 Tworzenie i edycja projektów
- 🧑‍🤝‍🧑 Zarządzanie członkami zespołu
- ⏱️ Zarządzanie zadaniami i ich statusami
- 📊 Przegląd postępów i statystyk
- 🔒 Bezpieczne API z kontrolą dostępu

---

## 📦 Uruchamianie lokalnie

### Backend

```bash
cd backend
./mvn spring-boot:run

cd frontend
npm install
npm run dev

🛠 Wymagania

    Node.js 18+

    Java 17+

    PostgreSQL 14+


ProjectManager/
├── backend/           # Serwer Spring Boot
├── frontend/          # Aplikacja Next.js
└── README.md
