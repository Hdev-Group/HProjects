import DropdownMenuMain from '../dropdowns/dropdown'

const parseTasks = (tasks) => {
  const [completed, total] = tasks.split('/').map(Number);
  return { completed, total };
};

const calculateProgress = (completed, total) => {
  return total > 0 ? (completed / total) * 100 : 0;
};

const BoxProjectBuilding = ({ name, id, pinned, tasks }) => {
  const { completed, total } = parseTasks(tasks);
  const progress = calculateProgress(completed, total);

  return (
    <div className="relative">
      <a href={`/projects/${id}`}>
        <div className="flex flex-col dark:bg-neutral-900/70 w-[300px] px-4 py-5 rounded-lg border bg-neutral-200 text-black dark:text-white border-neutral-500 dark:border-neutral-800">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-2xl font-bold">{name}</h1>
          </div>
          <div className="flex flex-row items-center justify-between mt-4">
            <div className="flex items-center gap-2 justify-between  px-4 rounded-[4rem] developing border-2">
              <div className="developingdot" />
              Developing
            </div>
          </div>
          <div className="flex flex-col justify-between mt-1 w-[100%]">
            <div className="flex justify-end w-[100%] mb-2">{tasks}</div>
            <div className="flex w-[100%] h-[20px] rounded-lg bg-neutral-600/40 overflow-hidden">
              <div className="flex h-[20px] rounded-lg developing" style={{ width: `${progress}%` }} /> 
            </div>
          </div>
        </div>
      </a>
      <DropdownMenuMain pinned={pinned} id={id} pname={name} />
    </div>
  );
};

const BoxProjectlive = ({ name, id, pinned, tasks }) => {
  const { completed, total } = parseTasks(tasks);
  const progress = calculateProgress(completed, total);

  return (
    <div className="relative">
      <a href={`/projects/${id}`}>
        <div className="flex flex-col dark:bg-neutral-900/70 w-[300px] px-4 py-5 rounded-lg border bg-neutral-200 text-black dark:text-white border-neutral-500 dark:border-neutral-800">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-2xl font-bold">{name}</h1>
          </div>
          <div className="flex flex-row items-center justify-between mt-4">
            <div className="flex items-center gap-2 justify-between  px-4 rounded-[4rem] live border-2">
              <div className="livedot" />
              Live
            </div>
          </div>
          <div className="flex flex-col justify-between mt-1 w-[100%]">
            <div className="flex justify-end w-[100%] mb-2">{tasks}</div>
            <div className="flex w-[100%] h-[20px] rounded-lg bg-neutral-600/40 overflow-hidden">
              <div className="flex h-[20px] rounded-lg live" style={{ width: `${progress}%` }} /> 
            </div>
          </div>
        </div>
      </a>
      <DropdownMenuMain pinned={pinned} id={id} pname={name} />
    </div>
  );
};

const BoxProjectPlanning = ({ name, id, pinned, tasks }) => {
  const { completed, total } = parseTasks(tasks);
  const progress = calculateProgress(completed, total);


  return (
    <div className="relative">
      <a href={`/projects/${id}`}>
        <div className="flex flex-col dark:bg-neutral-900/70 w-[300px] px-4 py-5 rounded-lg border bg-neutral-200 text-black dark:text-white border-neutral-500 dark:border-neutral-800">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-2xl font-bold">{name}</h1>
          </div>
          <div className="flex flex-row items-center justify-between mt-4">
            <div className="flex items-center gap-2 justify-between  px-4 rounded-[4rem] planning border-2">
              <div className="planningdot" />
              Planning
            </div>
          </div>
          <div className="flex flex-col justify-between mt-1 w-[100%]">
            <div className="flex justify-end w-[100%] mb-2">{tasks}</div>
            <div className="flex w-[100%] h-[20px] rounded-lg bg-neutral-600/40 overflow-hidden">
              <div className="flex h-[20px] rounded-lg planning" style={{ width: `${progress}%` }} /> 
            </div>
          </div>
        </div>
      </a>
      <DropdownMenuMain pinned={pinned} id={id} pname={name} />
    </div>
  );
};

export { BoxProjectBuilding, BoxProjectlive, BoxProjectPlanning };
