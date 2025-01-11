export function ProductWrapper({ 
    scrollable = false, 
    children, 
    className = '', 
    header = "Today's Best Offer", 
    headerClass = "md:text-4xl text-2xl font-semibold font-serif" ,
    view=true,
    onclick
}) {
    return (
        <div>
            <h1 className={`${headerClass} flex justify-between`}>
                {header} 
                <span>{view ? <button onClick={onclick}>View all</button> : ""}</span>
            </h1>
            <div
                className={`
                    ${scrollable 
                        ? "flex items-center gap-3 overflow-x-auto md:overflow-x-scroll md:max-w-full p-1" 
                        : "grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 w-full"} 
                    ${className} mt-5`}
            >
                {children}
            </div>
        </div>
    );
}
