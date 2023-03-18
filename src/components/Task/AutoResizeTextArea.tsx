import React from "react";
import { Textarea, TextareaProps } from "@chakra-ui/react";
import ResizeTextArea from 'react-textarea-autosize';

// eslint-disable-next-line react/display-name
const AutoResizeTextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>((props, ref) => {
  return <Textarea 
    as={ResizeTextArea}
    minH='unset'
    ref={ref}
    {...props}
  />;
});

export default AutoResizeTextArea;