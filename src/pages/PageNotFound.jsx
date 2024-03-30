import CryingEmoji from '../media/not-found.png';

function PageNotFound() {
  return (
    <div className="flex flex-col items-center">
      <div className="gap-6n mt-16 flex flex-col items-center">
        <h1 className="text-7xl font-extrabold">Pagina non trovata!</h1>
        <img className="h-60 w-60" src={CryingEmoji} />
      </div>
    </div>
  );
}

export default PageNotFound;
