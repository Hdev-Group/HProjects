type User = {
    _id: String;
};

const users: User[] = [
    { _id: "123" },
    { _id: "456" },
    { _id: "789" },
];

// Function to get user by _id
export default function getUser(userId: string): User | undefined {
    return users.find(user => user._id === userId);
}
