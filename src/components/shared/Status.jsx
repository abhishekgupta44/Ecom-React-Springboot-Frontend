
const Status = ({text, icon:Icon, bg, color}) => {
  return (
    <div className={`${bg} ${color} flex items-center gap-1 px-2 py-2 rounded-md text-sm font-medium`}>
        {text} <Icon size={15}/>
    </div>
  )
}

export default Status;
