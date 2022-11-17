





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

| Wireframe | Realizacija|
|-----------|------------|
|![Header wireframe](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/pictures/Header_component.png)|![enter image description here](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/pictures/Header_component_pic.png)|
|![enter image description here](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/pictures/login.png)|![enter image description here](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/pictures/login_pic.png)|
|![enter image description here](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/pictures/component_list.png)|![enter image description here](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/pictures/component_list_pic.png)|
|![enter image description here](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/pictures/component_more.png)|![enter image description here](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/pictures/component_more_pic.png)|
|![enter image description here](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/pictures/description.png)|![enter image description here](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/pictures/description_pic.png)|
|![enter image description here](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/pictures/edit_region.png)|![enter image description here](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/pictures/edit_region_pic.png)|
|![enter image description here](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/pictures/create_user.png)|![enter image description here](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/pictures/create_user_pic.png)|
|![enter image description here](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/pictures/edit_building.png)|![enter image description here](https://github.com/lure110/Saitynu_projektas_Valda/blob/main/pictures/edit_building_pic.png)|
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
{domain}/api/regions/**1**

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

#### Panaudojimo pavyzdžiai

##### Užklausa:
{domain}/api/regions

##### JSON duomenys:

    {
	    "country": "Lenkija",
	    "name": "Liubušas",
	    "description": "Regionas šalia vandens"
    }

##### Atsakymas:

    {
	    "id": 7,
	    "country": "Lenkija",
	    "name": "Liubušas",
	    "description": "Regionas šalia vandens"
    }

#### PATCH api/regions/id

Koreguoja regiono su **id** turimus duomenis.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |

##### Reikalaujami siuntimo parametrai:

| Parametras	 |Reikšmė                        |
|----------------|-------------------------------|
|description     |Regiono aprašymas				 |

#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|200	 		 |Gražina koreguotą regioną	     |

#### Panaudojimo pavyzdžiai

##### Užklausa:

{domain}/api/regions/**7**
##### JSON duomenys:

    {
	    "description": "Regionas šalia vandens"
    }

##### Atsakymas:

**Kai duomenų bazė turi duomenų:**

    {
        "id": 7,
        "country": "Lenkija",
        "name": "Liubušas",
        "description": "Regionas šalia vandens"
    }

  **Kai duomenų bazė neturi duomenų:**

    {
	    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
	    "title": "Not Found",
	    "status": 404,
	    "traceId": "00-8ef365ac0cc368046c207f2296be1b9f-4301ff3d14c9b82e-00"
    }    
#### DELETE api/regions/id

Panaikiną regiono su **id** įrašą.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |


#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|204	 		 |Nieko negražina			     |

#### Panaudojimo pavyzdžiai

##### Užklausa:
{domain}/api/regions/**1**

##### Atsakymas:

Gražinamas 204 kodas

### Žemės plotai

#### GET api/regions/regionId/landplots

Gražina visus žemės plotus susietus su regionu, kurio id lygus **regionId**.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |


#### Galimi atsako kodai

  
| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|200|Gražina sąrašą su reikšmėmis


  

#### Panaudojimo pavyzdžiai

##### Užklausa:

{domain}/api/regions/**1**/landplots

##### Atsakymas:

**Kai duomenų bazė turi duomenų:**

    [
	    {
		    "id": 1,
		    "address": "Vaižganto g. 1, 60150 Raseiniai",
		    "owner": "Nerijus Duoba"
	    },
	    {
		    "id": 2,
		    "address": "Jotvingių g. 10, 60113 Raseiniai",
		    "owner": "Gediminas Gilpa"
	    },
	    {
		    "id": 3,
		    "address": "Kunigaikščių g. 7, 60176 Raseiniai",
		    "owner": "Rimantas Vauka"
	    }
    ]

**Kai duomenų bazė neturi duomenų:**

    []

#### GET api/regions/regionId/landplots/id

Gražina žemės plotą pagal **id**, kuris susietas su regionu, kurio id lygus **regionId**.

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
{domain}/api/regions/**1**/landplots/**1**

##### Atsakymas:

**Kai duomenų bazė turi duomenų:**

    {
	    "id": 1,
	    "address": "Vaižganto g. 1, 60150 Raseiniai",
	    "owner": "Nerijus Duoba"
    }

  **Kai duomenų bazė neturi duomenų:**

    {
	    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
	    "title": "Not Found",
	    "status": 404,
	    "traceId": "00-8ef365ac0cc368046c207f2296be1b9f-4301ff3d14c9b82e-00"
    }

#### POST api/regions/regionId/landplots

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |

##### Reikalaujami siuntimo parametrai:

| Parametras	 |Reikšmė                        |
|----------------|-------------------------------|
|address		 |Žemės ploto adresas	         |
|owner			 |Žemės ploto savininko vardas   |

#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|201	 		 |Gražina sukurtą žemės plotą 	 |

#### Panaudojimo pavyzdžiai

##### Užklausa:
{domain}/api/regions/**1**/landplots

##### JSON duomenys:

    {
	    "address": "Kunigaikščių g. 7, 60176 Raseiniai",
	    "owner": "Rimantas Vauka"
    }

##### Atsakymas:

    {
	    "id": 3,
	    "address": "Kunigaikščių g. 7, 60176 Raseiniai",
	    "owner": "Rimantas Vauka"
    }

 
#### PATCH api/regions/regionId/landplots/id

Koreguoja žemės ploto su **id** turimus duomenis.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |

##### Reikalaujami siuntimo parametrai:

| Parametras	 |Reikšmė                        |
|----------------|-------------------------------|
|owner			 |Žemės ploto savininko vardas   |

#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|200	 		 |Gražina koreguotą žemės plotą	 |

#### Panaudojimo pavyzdžiai

##### Užklausa:

{domain}/api/regions/**1**/landplots/**1**
##### JSON duomenys:

    {
	    "owner": "Rimantas Vauka"
    }

##### Atsakymas:

**Kai duomenų bazė turi duomenų:**

    {
	    "id": 3,
	    "address": "Kunigaikščių g. 7, 60176 Raseiniai",
	    "owner": "Rimantas Vauka"
    }

  **Kai duomenų bazė neturi duomenų:**

    {
	    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
	    "title": "Not Found",
	    "status": 404,
	    "traceId": "00-8ef365ac0cc368046c207f2296be1b9f-4301ff3d14c9b82e-00"
    }    
#### DELETE api/regions/regionId/landplots/id

Panaikiną žemės ploto su **id** įrašą.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |


#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|204	 		 |Nieko negražina			     |

#### Panaudojimo pavyzdžiai

##### Užklausa:
{domain}/api/regions/**1**/landplots/**1**

##### Atsakymas:

Gražinamas 204 kodas

### Pastatai

#### GET api/regions/regionId/landplots/landplotId/buildings

Gražina visus pastatus susietus su žemės plotu **landplotId** ir regionu, kurio id lygus **regionId**.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |


#### Galimi atsako kodai

  
| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|200|Gražina sąrašą su reikšmėmis


  

#### Panaudojimo pavyzdžiai

##### Užklausa:

{domain}/api/regions/**1**/landplots/**1**/buildings

##### Atsakymas:

**Kai duomenų bazė turi duomenų:**

        [
		    {
			    "id": 1,
			    "name": "Silo 1",
			    "type": "Grain",
			    "size": 600,
			    "occupancy": 600
		    },
		    {
			    "id": 6,
			    "name": "Silo_2",
			    "type": "Barley",
			    "size": 600,
			    "occupancy": 240
		    },
        ]

**Kai duomenų bazė neturi duomenų:**

    []

#### GET api/regions/regionId/landplots/landplotId/buildings/id

Gražina pastatą pagal **id**, kuris susietas su regionu ir žemės plotu, kurių id lygūs **regionId** ir **landplotId**.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |


#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|200	 		 |Gražina pastatą su reikšmėmis  |
|404			 |Naudotojas su **id** nerastas  |

#### Panaudojimo pavyzdžiai

##### Užklausa:
{domain}/api/regions/**1**/landplots/**1**/buildings/**1**

##### Atsakymas:

**Kai duomenų bazė turi duomenų:**

    {
    	"id": 1,
    	"name": "Silo 1",
    	"type": "Grain",
    	"size": 600,
    	"occupancy": 600
    }

  **Kai duomenų bazė neturi duomenų:**

    {
	    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
	    "title": "Not Found",
	    "status": 404,
	    "traceId": "00-8ef365ac0cc368046c207f2296be1b9f-4301ff3d14c9b82e-00"
    }

#### POST api/regions/regionId/landplots/landplotId/buildings
##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |

##### Reikalaujami siuntimo parametrai:

| Parametras	 |Reikšmė                        |
|----------------|-------------------------------|
|name			 |Pastato pavadinimas	         |
|type			 |Pastato tipas   				 |
|size			 |Maksimali pastato talpa   	 |
|occupancy		 |Dabartinis pastato užimtumo kiekis   |

#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|201	 		 |Gražina sukurtą pastatą	 |

#### Panaudojimo pavyzdžiai

##### Užklausa:
{domain}/api/regions/**1**/landplots/**1**/buildings

##### JSON duomenys:

    {
	    "name": "Silo_2",
	    "type": "Barley",
	    "size": 600,
	    "occupancy": 125
    }

##### Atsakymas:

	{
	    "id": 1008,
	    "name": "Silo_2",
	    "type": "Barley",
	    "size": 600,
	    "occupancy": 125
	}


#### PATCH api/regions/regionId/landplots/landplotId/buildings/id

Koreguoja pastato su **id** turimus duomenis.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |

##### Reikalaujami siuntimo parametrai:

| Parametras	 |Reikšmė                        |
|----------------|-------------------------------|
|type			 |Pastato tipas   				 |
|size			 |Maksimali pastato talpa   	 |
|occupancy		 |Dabartinis pastato užimtumo kiekis   |

#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|200	 		 |Gražina koreguotą pastatą	 |

#### Panaudojimo pavyzdžiai

##### Užklausa:

{domain}/api/regions/**1**/landplots/**1**/buildings/**1**

##### JSON duomenys:

    {
	    "type": "Grain",
	    "size": 400,
	    "occupancy": 250
    }

##### Atsakymas:

**Kai duomenų bazė turi duomenų:**

    {
	    "id": 1,
	    "name": "Silo_1",
	    "type": "Grain",
	    "size": 400,
	    "occupancy": 250
    }

  **Kai duomenų bazė neturi duomenų:**

    {
	    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
	    "title": "Not Found",
	    "status": 404,
	    "traceId": "00-8ef365ac0cc368046c207f2296be1b9f-4301ff3d14c9b82e-00"
    }    
    
#### DELETE api/regions/regionId/landplots/landplotId/buildings/id

Panaikiną pastato su **id** įrašą.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |


#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|204	 		 |Nieko negražina			     |

#### Panaudojimo pavyzdžiai

##### Užklausa:
{domain}/api/regions/**1**/landplots/**1**/buildings/**1**

##### Atsakymas:

Gražinamas 204 kodas

### Naudotojai

#### GET api/users

Gražina visus naudotojus.

Šį veiksmą gali atlikti tik administratorius.

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
{domain}/api/users

##### Atsakymas:

**Kai duomenų bazė turi duomenų:**

    [
	    {
		    "id": 1,
		    "name": "User first and last name",
		    "email": "administrator@mail.com",
		    "password": "$2a$11$beIOcDJWCI8Mh206tweaHeXzViULgBV3GlyV.N2c6OMu8q4pTLLxe",
		    "role": "Administrator"
	    },
	    {
		    "id": 1,
		    "name": "User first and last name",
		    "email": "manager@mail.com",
		    "password": "$2a$11$KLWsFT0.gf4KQ6A/79YOzeoHCrVnAvaBtddM9cewVvj5uo7DY6GWa",
		    "role": "Manager"
	    }
    ]

  **Kai duomenų bazė neturi duomenų:**

    []

#### GET api/users/id

Gražina naudotoją pagal pateikiamą **id**.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |


#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|200	 		 |Gražina naudotojo duomenis     |
|404			 |Naudotojas su **id** nerastas  |

#### Panaudojimo pavyzdžiai

##### Užklausa:
{domain}/api/users/**1**

##### Atsakymas:

**Kai duomenų bazė turi duomenų:**

    {
	    "id": 1,
	    "name": "User first and last name",
	    "email": "administrator@mail.com",
	    "password": "$2a$11$beIOcDJWCI8Mh206tweaHeXzViULgBV3GlyV.N2c6OMu8q4pTLLxe",
	    "role": "Administrator"
    },

  **Kai duomenų bazė neturi duomenų:**

    {
	    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
	    "title": "Not Found",
	    "status": 404,
	    "traceId": "00-8ef365ac0cc368046c207f2296be1b9f-4301ff3d14c9b82e-00"
    }

#### POST api/users

Sukuria naują naudotoją pagal pateiktus duomenis.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |

##### Reikalaujami siuntimo parametrai:

| Parametras	 |Reikšmė                        |
|----------------|-------------------------------|
|name			 |Naudotojo vardas    		     |
|email			 |Naudotojo prisijungimui naudojamas el-paštas|
|role			 |Naudotojo rolė				 |

#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|201	 		 |Gražina sukurtą naudotoją		 |

#### Panaudojimo pavyzdžiai

##### Užklausa:
{domain}/api/users

##### JSON duomenys:

    {
	    "name": "Naudotojas",
	    "email": "administrator1@mail.com",
	    "password": "pa55w0rd123",
	    "role": "Administrator"
    }

##### Atsakymas:

    {
	    "id": 1,
	    "name": "Naudotojas",
	    "email": "administrator1@mail.com",
	    "password": "$2a$11$beIOcDJWCI8Mh206tweaHeXzViULgBV3GlyV.N2c6OMu8q4pTLLxe",
	    "role": "Administrator"
    },

#### PATCH api/users/id

Koreguoja naudotojo su **id** turimus duomenis.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |

##### Reikalaujami siuntimo parametrai:

| Parametras	 |Reikšmė                        |
|----------------|-------------------------------|
|description     |Regiono aprašymas				 |

#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|200	 		 |Gražina koreguotą regioną	     |

#### Panaudojimo pavyzdžiai

##### Užklausa:

{domain}/api/users/**7**
##### JSON duomenys:

    {
	    "name": "User name",
	    "email": "manager@mail.com",
	    "password": "pa55w0rd"
    }

##### Atsakymas:

**Kai duomenų bazė turi duomenų:**

    {
        "id": 7,
	    "name": "User name",
	    "email": "manager@mail.com",
	    "password": "pa55w0rd",
	    "role": "Manager"
    }

  **Kai duomenų bazė neturi duomenų:**

    {
	    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
	    "title": "Not Found",
	    "status": 404,
	    "traceId": "00-8ef365ac0cc368046c207f2296be1b9f-4301ff3d14c9b82e-00"
    }    

#### DELETE api/users/id

Panaikiną naudotojo su **id** įrašą.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |


#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|204	 		 |Nieko negražina			     |

#### Panaudojimo pavyzdžiai

##### Užklausa:
{domain}/api/users/**1**

##### Atsakymas:

Gražinamas 204 kodas

### Autentifikacija ir autorizacija

 #### POST auth/login

Naudotojas prisijungia prie sistemos

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|withCredentials |true				             |
|Content-Type    |application/json				 |

##### Reikalaujami siuntimo parametrai:

| Parametras	 |Reikšmė                        |
|----------------|-------------------------------|
|email			 |Naudotojo prisijungimo paštas  |
|password		 |Naudotojo slaptažodis          |


#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|200	 		 |Sėkmingai prisijungė		     |
|401	 		 |Prisijungti nepavyko		     |

#### Panaudojimo pavyzdžiai

##### Užklausa:

{domain}/auth/login

##### JSON duomenys:

    {
	    "email": "manager@mail.com",
	    "password": "pa55w0rd",
    }

#### Atsakymas

**Jei naudotojas egzistuoja**
Gražinama prieigos žetonas ir šio žetono atnaujinimo žetonas.

    {
	    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFkbWluaXN0cmF0b3JAbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSm9uYXMgQnVsb8WhaXVzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW5pc3RyYXRvciIsIm5iZiI6MTY2ODY5MDcyNCwiZXhwIjoxNjY4NzIwNzI0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTk0IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE5NCJ9.p6zZOitZlVtwu8CLl9sl_S4whuQkUFQUva5IFTNojpk",
	    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2Njg2OTA3MjQsImV4cCI6MTY2ODc3NzEyNCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE5NCIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcxOTQifQ.gCQhhqPkVlbvmVkuEbFcIWF36nsGEJBMUqOIgjkwBTc"
    }

**Jei naudotojas neegzistuoja**

    {
	    "type": "https://tools.ietf.org/html/rfc7235#section-3.1",
	    "title": "Unauthorized",
	    "status": 401,
	    "traceId": "00-977ff77494f66ac64de1f3efc7f93f54-3c59f865d27340c4-00"
    }

 #### DELETE auth/logout

Panaikiną visus **refresh** ir **access** žetonus susyjusius su naudotoju.

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |


#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|204	 		 |Nieko negražina			     |

#### Panaudojimo pavyzdžiai

##### Užklausa:
{domain}/auth/logout

##### Atsakymas:

Gražinamas 204 kodas

 #### POST auth/register

Užregistruojamas naujas naudotojas

##### Reikalaujamos siuntimo antraštės:

| Antraštė       |Reikšmė                        |
|----------------|-------------------------------|
|Authorization	 |JWT access token	             |
|withCredentials |true				             |
|Content-Type    |application/json				 |

##### Reikalaujami siuntimo parametrai:

| Parametras	 |Reikšmė                        |
|----------------|-------------------------------|
|email			 |Naudotojo paštas	 	         |
|password		 |Naudotojo slaptažodis          |
|role     		 |Naudotojo rolė				 |
|name 			 |Naudotojo vardas				 |


#### Galimi atsako kodai

| Atsako kodas 	 |Reikšmė                        |
|----------------|-------------------------------|
|201	 		 |Gražina sukurtą naudotoją	 	 |

#### Panaudojimo pavyzdžiai

##### Užklausa:
{domain}/auth/register

##### JSON duomenys:

    {
	    "name": "Naudotojas",
	    "email": "administrator1@mail.com",
	    "password": "pa55w0rd123",
	    "role": "Administrator"
    }

##### Atsakymas:

    {
	    "id": 1,
	    "name": "Naudotojas",
	    "email": "administrator1@mail.com",
	    "password": "$2a$11$beIOcDJWCI8Mh206tweaHeXzViULgBV3GlyV.N2c6OMu8q4pTLLxe",
	    "role": "Administrator"
    },

## Projekto išvados

Projektinis darbas pavyko, nes sėkmingai buvo įgyvendinti funkciniai reikalavimai. Projekto realizavimo metu buvo susidurta su **CORS**(Cross-origin Resource Sharing) problema, kuri neleido bendrauti kliento pusės aplikacijai su serverio API. Taip pat dėl pasibaigusio Azure prenumeratos laiko teko sustabdyti tinkle veikusios aplikacijos veiklą.


