let rows=[];
class RowApi {

    static getRows(tableState) {
        return new Promise((resolve, reject) => {
          const url='https://gurudevinformatics.com/fetch/podHis.php';
          fetch(url)
          .then(res => res.json())
          .then(da => {
            rows = da;
          })
          .catch((error) => {
          console.error(error);
          });
          setTimeout(() => {   
            const updatedState = Object.assign({}, tableState);
    
            let searchRange = rows.slice(updatedState.numberOfRows * updatedState.page - updatedState.numberOfRows, updatedState.numberOfRows * updatedState.page);
    
            updatedState.rows = searchRange;
            updatedState.dataDup = rows;
            updatedState.total = rows.length;
            updatedState.numberOfRows = updatedState.numberOfRows;
            resolve(updatedState);
          }, 1000 );
    
        });
      }
    }
    
    export default RowApi;