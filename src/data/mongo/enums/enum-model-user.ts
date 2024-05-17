enum UserRole{
    admin = 'ADMIN_ROLE',
    user = 'USER_ROLE'
}

export class EnumUserModel  {

    static get roles(){
        return ['ADMIN_ROLE','USER_ROLE']
    }
}