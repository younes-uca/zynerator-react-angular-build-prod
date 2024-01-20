import {BaseCriteria} from 'app/zynerator/criteria/BaseCriteria.model';


export class UserCriteria extends BaseCriteria {

    public emailLike: string;
    public telephoneLike: string;
    public nomLike: string;
    public prenomLike: string;
    public dateNaissance: Date | null;
    public dateNaissanceFrom: Date | null;
    public dateNaissanceTo: Date | null;
    public credentialsNonExpired: null | boolean;
    public enabled: null | boolean;
    public accountNonExpired: null | boolean;
    public accountNonLocked: null | boolean;
    public passwordChanged: null | boolean;
    public username: string;
    public usernameLike: string;
    public passwordLike: string;


    constructor() {
        super();
        this.emailLike = '';
        this.telephoneLike = '';
        this.nomLike = '';
        this.prenomLike = '';
        this.dateNaissance = null;
        this.dateNaissanceFrom = null;
        this.dateNaissanceTo = null;
        this.credentialsNonExpired = null;
        this.enabled = null;
        this.accountNonExpired = null;
        this.accountNonLocked = null;
        this.passwordChanged = null;
        this.usernameLike = '';
        this.username = '';
        this.passwordLike = '';
    }

}
