import { RolesBuilder } from 'nest-access-control'

export enum AppRoles {
    ADMIN     = 'ADMIN',
    STUDENT   = 'STUDENT',
    TEACHER   = 'TEACHER'
} 
export enum AppResources {
    BILL = 'BILL',
    CAREER = 'CAREER',
    SUBJECT = 'SUBJECT',
    USER = 'USER'
}

export const roles: RolesBuilder = new RolesBuilder()

roles
    //STUDENT
  .grant(AppRoles.STUDENT)
  .readOwn([AppResources.BILL, AppResources.SUBJECT, AppResources.USER])
  .createOwn([AppResources.BILL])
  .updateOwn([AppResources.USER])
    //TEACHER
  .grant(AppRoles.TEACHER)
  .readOwn([AppResources.SUBJECT, AppResources.USER])
  .createOwn([AppResources.SUBJECT])
  .updateOwn([AppResources.USER])
  .deleteOwn([AppResources.SUBJECT])
    //ADMIN
  .grant(AppRoles.ADMIN)
  .extend([AppRoles.STUDENT, AppRoles.TEACHER])
  .readAny([AppResources.BILL,AppResources.SUBJECT, AppResources.CAREER, AppResources.USER])
  .updateAny([AppResources.BILL,AppResources.SUBJECT, AppResources.CAREER, AppResources.USER])
  .deleteAny([AppResources.BILL,AppResources.SUBJECT, AppResources.CAREER, AppResources.USER])
  .createAny([AppResources.SUBJECT, AppResources.CAREER, AppResources.USER])