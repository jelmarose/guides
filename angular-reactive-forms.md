## Getting form control from inside a form group as short hand

```typescript
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ){ }

  signUpForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(12)]]
  });

  // Now you can use this.email to refer to the email control in this.signUpForm 
  // anywhere in the component (even in the HTML side)
  get email(){
    return this.signupForm.controls['email'] as FormControl;
  }

}

```


## Dealing with delay in valueChanges observable

```typescript
import { FormControl } from '@angular/forms'
import { pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // This is the control we will listen for changes.
  password = new FormControl('');
  
  constructor() { }
  
  ngOnInit(){
    this.listenForChanges();
  }
  
  listenForChanges(){
    // pairwise() will return two values:
    // - prev: the previous value before the valueChanges() fired
    // - next: the current value
    // this is important as sometimes valueChanges() returns the previous value 
    // which we don't want especially if we're doing real time validation 
    // (e.g. password - confirm password comparison)
    this.password.valueChanges.pipe(pairwise()).subscribe(([prev, next]: [string, string]) => { 
      if(next == 'some important value'){
        // do something
      }
    });
  }
  

}
```
