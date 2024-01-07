import { useState } from "react"
import NavLinkStyled from "../styledComponents/NavLinkStyled"
import { MdArrowForwardIos } from "react-icons/md";

const SubMenuMobile = ({list, toggle}) => {

    const [ openSubMenu, setOpenSubMenu ] = useState(true);
    const toggleSubMenu = () => setOpenSubMenu(!openSubMenu);
    const genderLink = list.name.toLowerCase().replace(" ", "-");

    return(
        <li className="list_item">
            <span onClick={toggleSubMenu} className="open_close_subMenu">{list.name} <MdArrowForwardIos style={{transform : openSubMenu ? "rotate(-90deg)" : "rotate(90deg)"}}/></span>             
            {openSubMenu &&
            <ul className="subList_item">
            {list.categories.map((categoryItem, index) => (
                <li key={index}>
                    <span className="subList_title">{categoryItem.name}</span>
                    <ul className="subCategory_list">
                        {categoryItem.subcategories.map((subCategoryItem) => (
                            <li key={subCategoryItem.id} className="subCategory_list_item">
                                <NavLinkStyled onClick={toggle} to={`/${genderLink}/${categoryItem.name.toLowerCase().replaceAll(" ", "-")}/${subCategoryItem.name.toLowerCase().replaceAll(" ","-")}&${subCategoryItem.id}`}>{subCategoryItem.name}</NavLinkStyled>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
            </ul>}
        </li>
    )
}

export default SubMenuMobile;