import DBConnect from "@/DBConnect/DBConnect";
import { NextResponse } from "next/server";
import { parse } from 'url';

// If there are query parameter then user are fetching by their email. otherwise all users will be fetched. this is also checking the user role
export async function GET(request) {
    try {
        const { query } = parse(request.url, true);
        const { email } = query;

        let filter = {};
        if (email === '') {
            filter = {}
        }
        if (email) {
            filter = {
                email: email,
            }
        }
        const database = await DBConnect();
        const userCollection = database.collection('users');
        const user = await userCollection.findOne(filter);
        return NextResponse.json(user)
    }
    catch (error) {
        console.log(error.name, error.message);
        return NextResponse.json({ error: error.message })
    }
}



// User are adding to the DB while they are signin in.
export async function POST(request) {
    try {
        const user = await request.json();
        const query = {
            email: user.email,
        };
        const database = await DBConnect();
        const userCollection = database.collection('users');
        const existingUser = await userCollection.findOne(query);

        // if the user is already signed up then it will show an error message and won't add to DB.
        if (existingUser) {
            return NextResponse.json({ message: 'user already exist' });
        }
        const newUser = await userCollection.insertOne(user);
        return NextResponse.json(newUser);
    }
    catch (error) {
        console.log(error.name, error.message);
        return NextResponse.json({ error: error.message })
    }
}



// Managing user role.  Admin || User || Viewer
// export async function PATCH(request) {
//     const updatedRole = await request.json();
//     const { query } = parse(request.url, true);
//     const { email } = query;

//     let filter = {};
//     if (email) {
//         filter = {
//             email: email,
//         }
//     };
//     const updateUserRole = {
//         $set: {
//             role: updatedRole,
//         },
//     };
//     const database = await DBConnect();
//     const userCollection = database.collection('users');
//     const userRole = await userCollection.updateOne(filter, updateUserRole);
//     return NextResponse.json(userRole);
// }