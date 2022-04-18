import { IUser, Users } from '../Models/Users.ts';

export const getUsers = (context: any) => {
    const { response } = context;
    response.status = 200;
    response.body = {
        success: true,
        msg: "Getting users...",
        data: Users
    };
};

export const getUser = (context: any) => {
    const { response, params } = context;
    const user: IUser | undefined = Users.filter(u => u.username == params.username)[0];
    response.status = user ? 200 : 404;
    response.body = {
        success: user ? true : false,
        data: user || {}
    };
};

export const postUser = async (context: any) => {
    const { request, response } = context;
    const body = await request.body({type: "json"});
    try {
        const userData = await body.value;
        Users.push(userData);
        response.status = 201;
        response.body = {
            success: true,
            msg: "User created"
        };
    } catch (e) {
        response.status = 400;
        response.body = {
            success: false,
            msg: "Could not parse JSON data"
        }
    }
};

export const putUser = async (context: any) => {
    const { request, response, params } = context;
    let userIndex = Users.findIndex(u => u.username == params.username);
    if (userIndex == -1) {
        response.status = 404;
        response.body = {
            success: false,
            msg: `Could not find user with name ${params.username}`
        };
        return;
    }
    const body = await request.body({type: "json"});
    try {
        const userData: IUser = await body.value;
        let user = {...Users[userIndex], ...userData};
        Users.splice(userIndex, 1, user);
        response.status = 200;
        response.body = {
            success: true,
            msg: "User updated"
        };
    } catch (e) {
        response.status = 400;
        response.body = {
            success: false,
            msg: "Could not parse JSON data"
        }
    }
};

export const deleteUser = (context: any) => {
    const { response, params } = context;
    let userIndex = Users.findIndex(u => u.username == params.username);
    if (userIndex == -1) {
        response.status = 404;
        response.body = {
            success: false,
            msg: `Could not find user with name ${params.username}`
        };
        return;
    }
    Users.splice(userIndex, 1);
    response.status = 200;
    response.body = {
        success: true,
        msg: "User deleted"
    };
};
