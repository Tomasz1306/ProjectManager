# ProjectManager

Functionalities:

User hierarchy 
-Porduct Owner
-Scrum Master
-Developer team


Projects
-making projects 
-managing projects
-describing relation beetwen projects
-adding ppl to project
-visualising important information about project (like which issues are completed or not)
-kanbab board 
-progress charts

Issues
-making issues 
-managing issues
-assigning ppl to issues 
-priority
-type
-tags
-comments
-notes
-logging system

Meetings
-meeting dashboard
-annoucement 

Website
-login/register panel
-authentication and authorization


Technologies
frontend: typescript (next js)
backend: java (java spring, java framework, java security, java JPA),
database: PostgreSQL 




Mechanizm pogladu kto jest aktywny i na jakim zadaniu.
Wyswietlenie logow w czasie rzeczywistym o wszystkich akcjach podejmowanych w projekcie.



Na samej gorze (navBar) panel do szukania (projektow zadan ludzi)
(przlaczanie miedzy kontekstem wyszukiwania(projektem zadaniem osoba) zrealizowac poprzez tabs w hero ui)

Home
- informacje o uzytkowniku. Gorny panel:
- zdjecie 
- duze imie i nazwisko 
- mniejszy email
- stanowisko 
- przycisk do wyswietlenia informacji
(mozna rowniez zrealizowac powiadomienia o czekajacych zadaniach, lub meetingach)
*(lub jezeli bedzie zaimplementowana funkcjonalnosc wiadomosci)
- jezeli ma drugie stanowisko to tez uwzglednic 
- odnosniki zebatka do ustawien
- dzwonek powiadomienia

- kolejne panele: 
- projekty
- zadania
- statystyki o wykonanych projektach lub zadaniach w ktorych uczesniczyl lub rozwiazal uzytkownik


- Projekt mozna dodac stan projektu czy jest zapauzowany czy w toku
(np zapauzowany zablurowac w jakims stopniu i wylaczyc interaktywnosc dla osob ktore nie sa zalozycielami projektu)

--ROLE 
-role mozna rozdizelic na stanowiska prywatne i role w danym projekcie zalozyciel admin itp (ale nie jest to potrzebne )