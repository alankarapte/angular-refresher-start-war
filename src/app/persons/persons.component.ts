import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { PersonService } from "./person.service";

@Component({
  selector: "app-persons",
  templateUrl: "./persons.component.html",
})
export class PersonsComponent implements OnInit, OnDestroy {
  // @Input() personList: string[];

  // private personService: PersonService;
  personList: String[] = [];

  isFetching: boolean = false; // just a trick show loader

  personUpdateListSubscription: Subscription = new Subscription();

  constructor(private personService: PersonService) {
    console.log("constructor");
    // this.personService = personService;
    // this.personList = this.personService.getAllPersons();
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    console.log("isFetching: " + this.isFetching);

    // this.personList = this.personService.persons;
    // this.personList = this.personService.getAllPersons();
    this.isFetching = true;
    this.personUpdateListSubscription = this.personService.personListUpdate.subscribe(
      (data) => {
        this.personList = data;
        this.isFetching = false;
      }
    );
    this.personService.getAllStarWarCharactors();
  }

  removePerson(name: String) {
    this.personService.removePerson(name);
    // this.personList = this.personService.getAllPersons();
  }

  ngOnDestroy(): void {
    this.personUpdateListSubscription.unsubscribe(); //to prevent memory leaks
  }
}
