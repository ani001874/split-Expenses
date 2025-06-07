

const Divider = ({msg}:{msg:string}) => {
  return (
    <div className="flex gap-2 items-center px-4 py-2">
        <span className="h-px bg-slate-300 flex-1" />
        <span className="text-lg font-medium">{msg}  </span>
         <span className="h-px bg-slate-300 flex-1" />
    </div>
  )
}

export default Divider