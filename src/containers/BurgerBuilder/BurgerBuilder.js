import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}


class BurgerBuilder extends Component{

  // constructor (props) {
  //   super(props)
  //   this.state = {...}
  // }

  state = {
    ingredients: {
      'salad' : 0,
      'bacon' : 0,
      'cheese' : 0,
      'meat' : 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }

purchaseHandler = () => {
  this.setState({purchasing: true} )
}
updatePurchaseState (ingredients) {

  const sum = Object.keys(ingredients)
              .map(igKey =>{
                return ingredients[igKey]
              })
              .reduce((sum, el) => {
                return sum + el
              }, 0)

  this.setState({purchasable: sum > 0})
}
addIngredientHandler = type => {
  const oldCount = this.state.ingredients[type]
  const updatedCount = oldCount + 1
  const updatedIngredients = {
    ...this.state.ingredients
  }
  updatedIngredients[type] = updatedCount

  const priceAddition = INGREDIENT_PRICES[type]
  const oldPrice = this.state.totalPrice
  const newPrice = oldPrice + priceAddition
  this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  this.updatePurchaseState(updatedIngredients)
}


removeIngredientHandler = type => {
  const oldCount = this.state.ingredients[type]
  const updatedCount = (oldCount - 1) < 0 ? 0 : oldCount - 1
  const updatedIngredients = {
    ...this.state.ingredients
  }
  updatedIngredients[type] = updatedCount

  const priceAddition = INGREDIENT_PRICES[type]
  const oldPrice = this.state.totalPrice
  const newPrice = oldPrice - priceAddition
  this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  this.updatePurchaseState(updatedIngredients)
}

purchaseCancelHandler = () => {
  this.setState({purchasing: false})
}

purchaseContinueHandler = () => {
  this.setState({loading: true})
  //alert('Please continue')
  const order = {
    ingredients: this.state.ingredients,
    price: this.state.totalPrice,
    customer: {
      name: 'Alex Ti',
      address: {
        street: 'Str 7 number Athens',
        zipCOde: '23423',
        country: 'Greece'
      },
      email: 'test@test.com',
    },
    deliveryMethod: 'fastest'
  }
  axios.post('orders.jsons', order)
  .then( res => {
    this.setState({loading: false, purchasing: false})
    console.log(res);
  })
  .catch(err => {
    this.setState({loading: false, purchasing: false})
    console.error(err);
  })
}

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let ordersummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
         />
     );
    if(this.state.loading){
      ordersummary = <Spinner />
    }
    return (
      <Aux>
        <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
          {ordersummary}
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientRemoved={this.removeIngredientHandler}
          ingredientAdded={this.addIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}/>
      </Aux>
    )
  }
}


export default withErrorHandler(BurgerBuilder, axios)
