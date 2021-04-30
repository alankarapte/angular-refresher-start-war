import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PersonService {
  personListUpdate: Subject<String[]> = new Subject<String[]>();

  // private persons: string[] = ["Alankar", "Rajesh", "Hari"];

  private isFetched: boolean = false; ///just made a trick to only fetch records once

  private persons: string[] = [];

  constructor(private httpClient: HttpClient) {}

  getAllStarWarCharactors() {
    if (!this.isFetched) {
      this.httpClient
        .get<any>("https://swapi.dev/api/people/")
        .pipe(
          map((data) => {
            return data.results.map((people) => people.name);
          })
        )
        .subscribe((transformedData) => {
          this.persons = transformedData;
          this.isFetched = true;

          this.personListUpdate.next(this.persons);
        });
    } else {
      this.personListUpdate.next(this.persons);
    }
    // return this.persons;
  }

  getAllPersons() {
    return this.persons;
  }

  createPerson(name) {
    this.persons.push(name);
    this.personListUpdate.next(this.persons);
    console.log(this.persons);
  }

  removePerson(name) {
    this.persons = this.persons.filter((person) => name !== person);
    this.personListUpdate.next(this.persons);
    console.log(this.persons);
  }
}
