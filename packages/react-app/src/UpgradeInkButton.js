import React, { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Popover, Button, Typography, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useContractLoader } from "./hooks"
import { Transactor } from "./helpers"

export default function UpgradeInkButton(props) {

  const [upgrading, setUpgrading] = useState(false)

  const writeContracts = useContractLoader(props.injectedProvider);
  const tx = Transactor(props.injectedProvider,props.gasPrice)

  const relayToken = async (tokenId) => {
    setUpgrading(true)
    try {
      let result = await tx(writeContracts["NiftyMediator"].relayToken(tokenId, { gasPrice:props.gasPrice } ))
      console.log("result", result)
    } catch (e) {
      console.log(e)
      notification.open({
        message: 'Upgrade failed',
        description: 'No changes made'
      });
      setUpgrading(false)
    }
    notification.open({
      message: 'Token successfully sent to '+process.env.REACT_APP_NETWORK_NAME+'!',
      description: ''
    });
    setUpgrading(false)
  }

    return (<Popover content={<div style={{textAlign:'center'}} >
                <Typography></Typography>
                <Button type="primary" style={{ marginBottom: 12 }} onClick={()=>{relayToken(props.tokenId)}} loading={upgrading}>
                <UploadOutlined style={{fontSize:26,marginLeft:4,verticalAlign:"middle"}}/> </Button>
                </div>
              }
              title={"Upgrade to Ethereum mainnet"}>
              <Button type="secondary" style={{ margin:4, marginBottom:12 }}><UploadOutlined/>Upgrade</Button>
            </Popover>)
  }