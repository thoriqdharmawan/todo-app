import React from 'react'

import { Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

interface Props {
  open: boolean;
  children: React.ReactNode;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default (props: Props) => {
  const { open, children } = props;

  return (
    <Dialog
      open={open}
      sx={{ borderRadius: 12 }}
      TransitionComponent={Transition}
    >
      {children}
    </Dialog>
  )
}