import React, {Component} from "react"
import Aux from "../Aux/Auxiliary"
import classes from "./Layout.module.css"
import ToolBar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false})
  }
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }
  render () {
    return (
          <Aux>
              <ToolBar drawerToggleClicked={this.sideDrawerToggleHandler}/>
              <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
             <main className={classes.Content}>
              {this.props.children}
             </main>
           </Aux>
  )}
}

export default Layout
