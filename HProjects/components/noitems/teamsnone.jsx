const NoTeams = () => {
    return (
        <div className="w-[100%] flex flex-col items-center">
        <h2 className="font-bold text-xl">No Teams out there for you 🔭</h2>
        <p>Create a new team or get invited to one.</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create a Team</button>
      </div>
    );
}
export default NoTeams;