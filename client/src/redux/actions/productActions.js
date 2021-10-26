import axios from 'axios';

export const getProducts = (cb) => (dispatch) => {
  dispatch({
    type: 'PRODUCT_SAVING',
  });

  axios
    .get('products')
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'RESET_BOOLEAN_STATUS',
        });
      }
      cb(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addProduct = (newProduct) => (dispatch) => {
  // Set isLoading to true
  dispatch({
    type: 'PRODUCT_SAVING',
  });

  axios
    .post('products', newProduct)
    .then((response) => {
      // Add prodcut to state when new product has been saved in the db
      if (response.status === 201) {
        dispatch({
          type: 'PRODUCT_ADDED',
          payload: newProduct,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: 'PRODUCT_SAVING_ERR',
        payload: err.response.data.message,
      });
    });
};

export const updateProduct = (updatedProduct, productId) => (dispatch) => {
  // Set isLoading to true
  dispatch({
    type: 'PRODUCT_SAVING',
  });

  axios
    .put(`products/${productId}`, updatedProduct)
    .then((response) => {
      if (response.status === 204) {
        dispatch({
          type: 'PRODUCT_UPDATED',
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: 'PRODUCT_SAVING_ERR',
        payload: err.response.data.message,
      });
    });
};

export const deleteProduct = (productId) => (dispatch) => {
  // Set isLoading to true
  dispatch({
    type: 'PRODUCT_SAVING',
  });

  axios
    .delete(`products/${productId}`)
    .then((response) => {
      if (response.status === 204) {
        dispatch({
          type: 'PRODUCT_DELETED',
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: 'PRODUCT_SAVING_ERR',
        payload: err.response.data.message,
      });
    });
};

export const reset = () => (dispatch) => {
  dispatch({
    type: 'RESET_BOOLEAN_STATUS',
  });
};
