# Laboratorinio darbo ataskaita

### Sistemos paskirtis:

##### Projekto tikslas
Sudaryti tinklo aplikaciją, kuri palengvintų turimo turto valdymą žemės ūkyje.

##### Tinklo aplikacijos veikimo principas: 
Valdytojas, kurio paskyrą sukuria administratorius, naudodamasis platforma tikrins sandėlių likučius ir prireikus juos pakeis.

### Funkciniai reikalavimai

 #### Neregistruotas sistemos naudotojas(Svečias) galės:
 1. Peržiūrėti platformos reprezentacinį puslapį.
 2. Prisijungti prie internetinės aplikacijos.
#### Registruotas sistemos naudotojas(Valdytojas) galės:
 1. Prisijungti prie platformos.
 2. Atsijungti nuo platformos.
 3. Užregistruoti naują sandėlį:
	 3.1. Aprašyti sandėlio savybes.
	 3.2. Redaguoti sandėlio savybes.
 4. Peržiūrėti kitų naudotojų užregistruotus sandėlius. 
#### Administratorius galės:
 1. Sudaryti naujo valdytojo ar administratoriaus paskyrą.
 2. Atlikti veiksmus su regionais:
	 2.1. Pridėti naują regioną.
	 2.2. Redaguoti regioną.
	 2.3. Pašalinti regioną.
 3. Atlikti veiksmus su žemės plotais:
	 3.1. Pridėti naują žemės plotą.
	 3.2. Redaguoti žemės plotą.
	 3.3. Pašalinti žemės plotą.
 4. Atlikti veiksmus su sandėliais:
	 4.1. Pridėti naują sandėlį.
	 4.2. Redaguoti sandėlį.
	 4.3. Pašalinti sandėlį
 5. Atlikti veiksmus su naudotojų duomenimis:
	 5.1. Pridėti naują naudotoją.
	 5.2. Redaguoti naudotojo duomenis.
	 5.3. Pašalinti naudotoją.

## Sistemos architektūra

![Sistemos diegimo diagrama](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/uml_deployment.png)

## Naudotojo sąsajos projektas:



## API specifkacija

### Regionai

#### GET api/regions

Gražina visus regionus.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |


#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|200	 		 |Gražina sąrašą su reikšmėmis   |

#### Panaudojimo pavyzdžiai

##### Užklausa:
{domain}/api/regions

##### Atsakymas:

**Kai duomenų bazė turi duomenų:**

    [
	    {
		    "id": 1,
		    "country": "Lietuva",
		    "name": "Žemaitija",
		    "description": "Regionas, kuriame dominuoja lygumos. Vasaros metu kritulių kiekis vidutinis. Regionas yra vakarų Lietuvoje"
	    },
	    {
		    "id": 2,
		    "country": "Lietuva",
		    "name": "Aukštaitija",
		    "description": "Didžiausias regionas Lietuvoje. Regionas yra šiaurės rytų Lietuvoje. Regione gausu ežerų."
	    },
    ]
  **Kai duomenų bazė neturi duomenų:**

    []

#### GET api/regions/id

Gražina regioną pagal pateikiamą **id**.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |


#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|200	 		 |Gražina sąrašą su reikšmėmis   |
|404			 |Naudotojas su **id** nerastas  |

#### Panaudojimo pavyzdžiai

##### Užklausa:
{domain}/api/regions/**id**

##### Atsakymas:

**Kai duomenų bazė turi duomenų:**

    {
	    "id": 1,
	    "country": "Lietuva",
	    "name": "Žemaitija",
	    "description": "Regionas, kuriame dominuoja lygumos. Vasaros metu kritulių kiekis vidutinis. Regionas yra vakarų Lietuvoje"
    }
  **Kai duomenų bazė neturi duomenų:**

    {
	    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
	    "title": "Not Found",
	    "status": 404,
	    "traceId": "00-8ef365ac0cc368046c207f2296be1b9f-4301ff3d14c9b82e-00"
    }

#### POST api/regions

Sukuria naują regioną pagal pateiktus duomenis.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |

##### Reikalaujami siuntimo parametrai:

| Parametras	 |Reikšmė                        |
|----------------|-------------------------------|
|country		 |šalis, kur yra regionas        |
|name			 |Regiono pavadinimas            |
|description     |Regiono aprašymas				 |

#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|201	 		 |Gražina sukurtą regioną	     |
