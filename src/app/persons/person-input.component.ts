import { Component, Output, EventEmitter } from "@angular/core";
import { PersonService } from "./person.service";

@Component({
  selector: "app-person-input",
  templateUrl: "./person-input.component.html",
  styleUrls: ["./person-input.component.css"],
})
export class PersonInputComponent {
  // @Output() personCreate = new EventEmitter<string>();
  enteredPersonName = "";

  constructor(private personService: PersonService) {}

  onCreatePerson() {
    // console.log('Created a person: ' + this.enteredPersonName);
    // this.personCreate.emit(this.enteredPersonName);
    // this.enteredPersonName = '';

    console.log("Created a person: " + this.enteredPersonName);
    this.personService.createPerson(this.enteredPersonName);
    this.enteredPersonName = "";
  }
}
