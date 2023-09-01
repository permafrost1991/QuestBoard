import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Divider, IconButton, Input, Stack, Tab, TabList, TabPanel, Tabs, Tooltip, Typography } from '@mui/joy';
import { addNode, setCampaign } from '../../reducers/campaignReducer';
import { saveCampaign } from '../../services/fileService';
import NodeExplorer from '../../components/NodeExplorer/NodeExplorer';
import './CreatorMode.scss';

const CreatorMode = () => {
  const campaignDataState = useSelector(state => state.campaign.data);
  const [leftViewState, setLeftViewState] = useState(0);
  const [rightViewState, setRightViewState] = useState(0);

  const campaignNameRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!campaignDataState) {
      navigate('/');
    }
  }, [campaignDataState]);

  const handleClickedSaveCampaign = () => {
    let campaignName = campaignDataState.name,
      campaignNameInputValue = campaignNameRef.current.childNodes[0].value;

    if (campaignNameInputValue && campaignName !== campaignNameInputValue) {
      campaignName = campaignNameInputValue;
    }

    const savedCampaign = saveCampaign(campaignName, campaignDataState);
    if (saveCampaign.error) {
      return;
    }

    dispatch(setCampaign(savedCampaign.content));
  };

  const handleClickedAddNewNode = () => {
    dispatch(addNode({
      nodeName: '~New Node~'
    }));
  };

  return (
    <div id='creator-mode-component'>
      {campaignDataState &&
        <>
          <Box display='flex' justifyContent='space-between' className='page-header'>
            <Box display='flex' gap='30px' alignItems='center'>
              <Link to='/'>
                <IconButton variant='plain' size='lg' className='home-btn'>
                  🏠
                </IconButton>
              </Link>
              <Typography level='h1'>Creator Mode</Typography>
            </Box>

            <Box display='flex' gap='10px' alignItems='center'>
              <Input sx={{ width: '400px' }}
                placeholder="Enter name of campaign..."
                ref={campaignNameRef}
              />
              <Button onClick={handleClickedSaveCampaign}>
                Export
              </Button>
            </Box>
          </Box>

          <Divider />

          <div className='body-container'>
            <Tabs value={leftViewState}
              onChange={(event, value) => setLeftViewState(value)}
              orientation='vertical'
              className='icon-container-left icon-container'
            >
              <TabList
                className='icon-bar-left icon-bar'
              >
                <Tab value={0} className='tab-icon'>
                  <Tooltip title='Campaign' disableInteractive>
                    <span>📓</span>
                  </Tooltip>
                </Tab>
                <Tab value={1} className='tab-icon'>
                  <Tooltip title='Quests' disableInteractive>
                    <span>📜</span>
                  </Tooltip>
                </Tab>
                <Tab value={2} className='tab-icon'>
                  <Tooltip title='Intel' disableInteractive>
                    <span>ℹ️</span>
                  </Tooltip>
                </Tab>
                {/* <Tab value={3} className='tab-icon'>
                  <Tooltip title='Notes' disableInteractive>
                    <span>📝</span>
                  </Tooltip>
                </Tab> */}
                <Tab value={3} className='tab-icon'>
                  <Tooltip title='Settings' disableInteractive>
                    <span>⚙️</span>
                  </Tooltip>
                </Tab>
              </TabList>

              <div className='content-container-left content-container'>
                <TabPanel value={0}>
                  <NodeExplorer />
                </TabPanel>
                <TabPanel value={1}>
                  Quest Explorer
                </TabPanel>
                <TabPanel value={2}>
                  Intel settings
                </TabPanel>
                <TabPanel value={3}>
                  Settings
                </TabPanel>
              </div>
            </Tabs>


            <Box value={rightViewState}
              onChange={(event, value) => setRightViewState(value)}
              orientation='vertical'
              className='icon-container-right icon-container'
            >
              <div className='content-container-right content-container'>

                TODO: Make node creation form

              </div>


              <Stack className='icon-bar-right icon-bar' gap='20px'>
                <Tooltip title='Add new node to selected node' disableInteractive>
                  <IconButton component='span'
                    variant='soft'
                    onClick={handleClickedAddNewNode}
                  >
                    ➕
                  </IconButton>
                </Tooltip>

                <Tooltip title='Delete selected node' disableInteractive>
                  <IconButton component='span'
                    variant='outlined'
                  >
                    🗑️
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          </div>
        </>
      }
    </div>
  );
};

export default CreatorMode;
