import React, { useState } from "react";
import { addNativeElement } from "@canva/design/index";
import styles from "../../styles/components.css";
import { Box, Button, FormField, Rows, TextInput } from "@canva/app-ui-kit";
import QRCode from "qrcode";


const QRCodePage = () => {
  const [text, setText] = useState("");

  const getDataUrl = async (): Promise<string> => {
    return QRCode.toDataURL(text);
  };

  const [isLoading, setIsLoading] = React.useState(false);
  const disabled = !text || text.trim().length < 1;


  const addNativeImage = async () => {
    console.log("add image");
    try {
      setIsLoading(true);
      await addNativeElement({
        type: "IMAGE",
        dataUrl: await getDataUrl()
      });
    } finally {
      console.log("add image done");
      setText("");
      setIsLoading(false);
    }
  };


  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="3u">
        <Box padding={"1u"}>
          <FormField
            label="Content"
            value={text}
            control={(props) => (
              <TextInput
                {...props}
                onChange={(value) => {
                  setText(value);
                }}
              />
            )}
          />
        </Box>
      </Rows>
      <Rows spacing="3u">
        <Box padding={"1u"}>
          <Button

            variant="primary"
            disabled={disabled}
            loading={isLoading}
            stretch
            onClick={addNativeImage}
          >
            Add QRCode
          </Button>
        </Box>
      </Rows>
    </div>
  );
};


export default QRCodePage;