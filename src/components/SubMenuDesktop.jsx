const SubMenuDesktop = ({list, open}) => {
    return(
        <div style={{top : open && "100%", opacity : open && "1"}} className="subMenu_hombre">
                    {list && 
                        list.map((Category, index) => (
                        <div className="subCategory_container" key={index}>
                            <h2>{Category.name}</h2>
                            <ul>
                                {Category.subcategories.map(subCategory => (
                                    <li key={subCategory.id}>
                                        <a href={`/moda-hombre/${Category.name.toLowerCase().replaceAll(" ", "-")}/${subCategory.name.toLowerCase().replaceAll(" ","-")}&${subCategory.id}`}>{subCategory.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
        </div>
    )
}

export default SubMenuDesktop;