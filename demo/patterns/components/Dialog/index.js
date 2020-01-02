import React, { useState } from 'react';
import {
  Dialog,
  DialogHeading,
  DialogContent,
  DialogFooter,
  DialogActions,
  Button
} from 'src/';
import DemoComponent from 'demo/Demo';

const Demo = () => {
  const [modalShow, setModalShow] = useState(false);
  const onModalClose = () => setModalShow(false);
  const onModalLauncherClick = () => setModalShow(true);
  const [alertShow, setAlertShow] = useState(false);
  const onAlertClose = () => setAlertShow(false);
  const onAlertLauncherClick = () => setAlertShow(true);

  return (
    <DemoComponent
      component={Dialog}
      states={[
        {
          DEMO_renderBefore: <h3>Modal Dialog</h3>,
          children: (
            <div>
              <DialogContent>Hello worlds</DialogContent>
              <DialogFooter>
                <Button onClick={onModalClose}>ok</Button>
                <Button variant="secondary" onClick={onModalClose}>
                  cancel
                </Button>
              </DialogFooter>
            </div>
          ),
          onClose: onModalClose,
          show: modalShow,
          heading: <DialogHeading>Hello</DialogHeading>,
          DEMO_renderAfter: (
            <Button onClick={onModalLauncherClick}>Launch Modal Dialog!</Button>
          )
        },
        {
          DEMO_renderBefore: <h3>Alert Dialog</h3>,
          alert: true,
          show: alertShow,
          onClose: onAlertClose,
          children: (
            <div>
              Do you accept the terms?
              <DialogActions>
                <Button onClick={onAlertClose}>Accept</Button>
                <Button onClick={onAlertClose} variant="secondary">
                  Decline
                </Button>
              </DialogActions>
            </div>
          ),
          DEMO_renderAfter: (
            <Button variant="secondary" onClick={onAlertLauncherClick}>
              Launch Alert Dialog!
            </Button>
          )
        }
      ]}
      propDocs={{}}
    />
  );
};

export default Demo;

/*
<div>
        <Dialog
          show={modalShow}
          onClose={onModalClose}
          heading={<DialogHeading>Testing123</DialogHeading>}
        >
          <DialogContent>
            <p>Hello worlds</p>
          </DialogContent>
          <DialogFooter>
            <Button onClick={onModalClose}>ok</Button>
            <Button variant="secondary" onClick={onModalClose}>
              cancel
            </Button>
          </DialogFooter>
        </Dialog>
        <Button onClick={onModalLauncherClick}>Launch Modal Dialog!</Button>
      </div>
      <div>
        <Dialog
          alert
          show={alertShow}
          onClose={onAlertClose}
          heading={<DialogHeading>Testing123</DialogHeading>}
        >
          Do you accept the terms?
          <DialogActions>
            <Button onClick={onAlertClose}>Accept</Button>
            <Button onClick={onAlertClose} variant="secondary">
              Decline
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant="secondary" onClick={onAlertLauncherClick}>
          Launch Alert Dialog!
        </Button>
      </div>
*/
