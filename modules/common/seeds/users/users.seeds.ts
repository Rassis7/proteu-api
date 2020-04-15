import { UserRole, UserStatus } from "../../../../generated";
import { User } from "../../../../modules/user/models/user.model";

const users: Partial<User>[] = [
  {
    _id: "5e967a977a1f991d5abebf32",
    name: "App Test Admin",
    email: "app_test_admin@app_test.com",
    status: UserStatus.Active,
    role: UserRole.Admin,
    password:
      "$argon2i$v=19$m=4096,t=3,p=1$JnjdhhsBocKUYT+/Cs9/gQ$aStlGqPXpvotsX/g/WYcxtieDg6jDa7aqcRtdpkl4Kg", //O9KucPtGBbzrFHdzUavn
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export = users;
