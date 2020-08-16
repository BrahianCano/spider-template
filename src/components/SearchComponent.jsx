import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';


const SearchComponent = (props) => {
     const history = useHistory();
     const [keyword, setKeyword] = useState('');
     const { widthInput, heightInput, widthForm } = props;


     const handleSubmit = (event) => {
          event.preventDefault();
          if (keyword.length > 0) {
               history.push('search=' + keyword);
          }
     }

     const handleChange = (event) => {
          setKeyword(event.target.value.toLowerCase());
     }


     return (
          <form className="page-search__form" onSubmit={handleSubmit} style={{ width: widthForm }}>
               <input type="search" style={{ width: widthInput, height: heightInput }}
                    id="searchtemplate"
                    value={keyword}
                    className="form-control shadow"
                    placeholder="Realiza una busqueda en Spider Template"
                    onChange={handleChange}
               />
          </form>
     );
}

export default withRouter(SearchComponent);