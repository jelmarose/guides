
# How to use rxjs observable for state management

Use case: if you need to reinitialize a component but want to retain its value.

## Creating a service for the observable

For example, we need this service for records management:

Run ``ng g s records-management`` on cmd.

Import the following on the .service file:

``typescript
import { Observable, Subject } from 'rxjs';
``

Let's say we want to keep track of the record ID the user viewed previously. We'll initialize a private Subject for it.

``private recordId = new Subject<string>();``

Then write the functions for getting, setting, and clearing the value of this Subject.

```typescript
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordsManagementService {

    constructor() { }

    private recordId = new Subject<string>();

    setRecordId(recordId: any) {
        this.recordId.next(recordId);
    }

    clearRecordId() {
        this.recordId.next();
    }

    getRecordId(): Observable<any> {
        return this.recordId.asObservable();
    }
}

```

## Using the service 

```typescript
import { RecordsManagementService } from './records-management.service'

@Component({
  selector: 'app-records-management',
  templateUrl: './records-management.component.html',
  styleUrls: ['./records-management.component.scss']
})
export class RecordsManagementComponent implements OnInit {

    constructor(private _stateManager: RecordsManagementService){ }

    ngOnInit(){

        // Set the value of the Subject
        // For example, we'll use the following string as the record ID

        let sampleId = "9d7bc951-9835-414a-b237-60c0bea1983f";
        this._stateManager.setRecordId(sampleId);

        // Get the value of the Subject
        this._stateManager.getRecordId().subscribe(result => {
            if(result){ 
                let recordIdFromObservable = result;
            }
        })

        // Clear the value of the Subject
        this._stateManager.clearRecordId();
    }


}

``
