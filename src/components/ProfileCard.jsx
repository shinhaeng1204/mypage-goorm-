export default function ProfileCard(props) {
  return (
    <div className="bg-white border rounded-md shadow-md h-56 flex flex-col items-center justify-center">
      <div className="font-semibold text-lg">{props.name}</div>
      <img
        src={props.profile.replace("./", "/")}
        alt={`${props.name}프로필`}
        className="w-20 h-20 rounded-full object-cover mb-3"
      />
      <div className="text-sm text-gray-500">{props.intro}</div>
      <div className="flex space-x-4">
        {props.GitHub && (
          <a
            href={props.GitHub}
            target="_blank"
            className="text-blue-500 hover:underline"
            rel="noreferrer"
          >
            GitHub
          </a>
        )}
        {props.blog && (
          <a
            href={props.blog}
            target="_blank"
            className="text-green-500 hover:underline"
            rel="noreferrer"
          >
            Blog
          </a>
        )}
      </div>
    </div>
  );
}
