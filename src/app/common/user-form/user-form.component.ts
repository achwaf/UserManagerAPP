import { Component, Input, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormLayout } from 'src/app/model/form-layout';
import { AnimalService } from 'src/app/services/animal.service';
import { EMAIL_REGEX, PASSWORD_MAX, USERNAME_MAX } from 'src/app/utils/constants';
import { UsernameState as UsernameEnum } from 'src/app/model/username-state';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { IModel } from 'src/app/model/i-model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  UserFormLayout = FormLayout;
  UsernameState = UsernameEnum;
  passwordVisible: boolean = false;
  selectedAvatar: number = 0;
  checked = faCheck
  invalid = faXmark;

  username?: string;
  password?: string
  usernameState?: UsernameEnum;
  showUsernameState?: boolean;

  @Input() layout: FormLayout = FormLayout.LOGIN;

  constructor(private animalService: AnimalService, private apiService: ApiService, private authService: AuthService,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.selectedAvatar = this.animalService.next();
  }

  getPasswordType() {
    return this.passwordVisible ? 'text' : 'password';
  }

  onFocusOutHandler() {
    // checks
    if (FormLayout.REGISTER === this.layout || FormLayout.CREATE === this.layout) {
      if (!!this.username && this.username.length > 0) {
        this.showUsernameState = true;
        if (this.username.length > USERNAME_MAX || !EMAIL_REGEX.test(this.username)) {
          // check username validity
          this.usernameState = UsernameEnum.NOT_VALID
        } else {
          this.apiService.checkIfUserameIsUsed(this.username).subscribe((used: boolean) => {
            this.usernameState = used ? UsernameEnum.USED : UsernameEnum.NOT_USED;
          });
        }
      } else {
        // if field is empty show nothing
        this.showUsernameState = false;
      }
    } else {
      this.showUsernameState = false;
    }

  }


  onFocusHandler() {
    this.showUsernameState = false;
  }

  changeAvatarHandler() {
    this.selectedAvatar = this.animalService.next();
  }

  showHandler() {
    this.passwordVisible = true
  }

  hideHandler() {
    this.passwordVisible = false;
  }

  changeLayout(layout: FormLayout) {
    this.layout = layout;
    this.passwordVisible = false;
    this.onFocusOutHandler();
  }

  loginHandler() {
    // gather data
    let userToLogin = {
      username: this.username!,
      password: this.password,
      avatar: 0
    }
    // generate a sessionID
    let sessionID = this.authService.generateSessionID();
    // call the login api
    this.apiService.loginUser(userToLogin, sessionID).subscribe((loginResponse: IModel) => {
      // user logged in
      // set username
      loginResponse.username = userToLogin.username;
      // call authService to save session details
      this.authService.login(loginResponse, sessionID);
      // redirect to /list
      this.router.navigate(['/list'])
    });
  }

  registerHandler() {
    if(UsernameEnum.NOT_VALID === this.usernameState){
      this.toastr.error('UserName is not valid');
    }else{
      // gather data
      let userToRegister = {
        username: this.username!,
        password: this.password,
        avatar: this.selectedAvatar,
      }
      // call the register api
      this.apiService.registerUser(userToRegister).subscribe(() => {
        // user registered
        this.toastr.success('User registered');
        // switch to login and clear the password
        this.password = undefined;
        this.changeLayout(FormLayout.LOGIN);
      });
    }
    
  }

}
