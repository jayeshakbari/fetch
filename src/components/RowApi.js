let rows=[];
class RowApi {
    static getRows(tableState) {
        const url='http://localhost:81/fetch/podHis.php';
          fetch(url)
          .then(res => res.json())
          .then(da => {
            rows = da;
          })
          .catch((error) => {
          console.error(error);
          });
        return new Promise((resolve, reject) => {
    
          setTimeout(() => {   
            const updatedState = Object.assign({}, tableState);
    
            let searchRange = rows.slice(updatedState.numberOfRows * updatedState.page - updatedState.numberOfRows, updatedState.numberOfRows * updatedState.page);
    
            updatedState.rows = searchRange;
            updatedState.total = rows.length;
            updatedState.numberOfRows = updatedState.numberOfRows;
            resolve(updatedState);
          }, 1000 );
    
        });
      }
    }
    
    export default RowApi;