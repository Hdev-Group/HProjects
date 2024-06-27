const BoxProjectBuilding = ({ name, id }) => {
    return (
      <a href={`/projects/${id}`}>
        <div className="flex flex-col bg-neutral-900/70 w-[300px] px-4 py-5 rounded-lg border-2 border-neutral-800">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="gap-1 flex flex-col cursor-pointer">
            <div className="h-[5px] w-[5px] rounded-full bg-white" />
            <div className="h-[5px] w-[5px] rounded-full bg-white" />
            <div className="h-[5px] w-[5px] rounded-full bg-white" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between mt-4">
          <div className="flex items-center gap-2 justify-between  px-4 rounded-[4rem] developing border-2">
            <div className="developingdot" />
            Building
          </div>
        </div>
        <div className="flex flex-col justify-between mt-1 w-[100%]">
          <div className="flex justify-end w-[100%] mb-2">1/99</div>
          <div className="flex w-[100%] h-[20px] rounded-lg bg-neutral-600/40 overflow-hidden">
            <div className="flex h-[20px] rounded-lg developing" style={{ width: '10%' }} />
          </div>
        </div>
      </div>
      </a>
    );
  };
  
  const BoxProjectlive = ({ name }) => {
    return (
      <a href={`/projects/${projectId}`}>
      <div className="flex flex-col bg-neutral-900/70 w-[300px] px-4 py-5 rounded-lg border-2 border-neutral-800">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="gap-1 flex flex-col cursor-pointer">
          <div className="h-[5px] w-[5px] rounded-full bg-white" />
            <div className="h-[5px] w-[5px] rounded-full bg-white" />
            <div className="h-[5px] w-[5px] rounded-full bg-white" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between mt-4">
          <div className="flex items-center gap-2 justify-between  px-4 rounded-[4rem] live border-2">
            <div className="livedot" />
            Live
          </div>
        </div>
        <div className="flex flex-col justify-between mt-1 w-[100%]">
          <div className="flex justify-end w-[100%] mb-2">1/99</div>
          <div className="flex w-[100%] h-[20px] rounded-lg bg-neutral-600/40 overflow-hidden">
            <div className="flex h-[20px] rounded-lg live" style={{ width: '10%' }} />
          </div>
        </div>
      </div>
      </a>
    );
  };
  
  const BoxProjectPlanning = ({ name }) => {
    return (
      <a href={`/projects/${projectId}`}>
      <div className="flex flex-col bg-neutral-900/70 w-[300px] px-4 py-5 rounded-lg border-2 border-neutral-800">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="gap-1 flex flex-col cursor-pointer">
          <div className="h-[5px] w-[5px] rounded-full bg-white" />
            <div className="h-[5px] w-[5px] rounded-full bg-white" />
            <div className="h-[5px] w-[5px] rounded-full bg-white" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between mt-4">
          <div className="flex items-center gap-2 justify-between  px-4 rounded-[4rem] planning border-2">
            <div className="planningdot" />
            Planning
          </div>
        </div>
        <div className="flex flex-col justify-between mt-1 w-[100%]">
          <div className="flex justify-end w-[100%] mb-2">1/99</div>
          <div className="flex w-[100%] h-[20px] rounded-lg bg-neutral-600/40 overflow-hidden">
            <div className="flex h-[20px] rounded-lg planning" style={{ width: '10%' }} />
          </div>
        </div>
      </div>
      </a>
    );
  };
  
  export { BoxProjectBuilding, BoxProjectlive, BoxProjectPlanning };
  