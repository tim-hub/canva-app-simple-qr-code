import React, { useState } from "react";
import cat from "assets/images/cat.jpg";
import dog from "assets/images/dog.jpg";
import rabbit from "assets/images/rabbit.jpg";
import styles from "styles/components.css";
import { initAppElement, addNativeElement } from "@canva/design";
import { Box, Button, FormField, NumberInput, Rows, Text, TextInput } from "@canva/app-ui-kit";
import clsx from "clsx";
import QRCodeStyling, { CornerDotType, CornerSquareType, DotType, DrawType, Options } from "qr-code-styling";

const blobToBase64 = async blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result)
    reader.error = (err) => reject(err)
    reader.readAsDataURL(blob)
  })
}

// We can't store the image's data URL in the app element's data, since it
// exceeds the 5kb limit. We can, however, store an ID that references the
// image.
type AppElementData = {
  imageId: string;
  width: number;
  height: number;
  rotation: number | undefined;
};

type UIState = AppElementData;

const images = {
  dog: {
    title: "Dog",
    imageSrc: dog
  },
  cat: {
    title: "Cat",
    imageSrc: cat
  },
  rabbit: {
    title: "Rabbit",
    imageSrc: rabbit
  }
};

const initialState: UIState = {
  imageId: "dog",
  width: 400,
  height: 400,
  rotation: 0
};

const appElementClient = initAppElement<any>({
  render: (data) => {
    return [
      {
        type: "IMAGE",
        top: 0,
        left: 0,
        width: 400,
        height: 400,
        rotation: 0,
        ...data
      }
    ];
  }
});

const appQRElementClient = initAppElement({
  render: (qr:any) => {
    return [
      {
        width: 400,
        height: 400,
        rotation: 0,
        type: "IMAGE",
        top: 0,
        left: 0,
        dataUrl: qr,
      }
    ];
  }
});

export const App = () => {
  const [state, setState] = React.useState<UIState>(initialState);
  const { imageId, width, height, rotation } = state;
  const disabled = !imageId || imageId.trim().length < 1;

  const items = Object.entries(images).map(([key, value]) => {
    const { title, imageSrc } = value;
    return {
      key,
      title,
      imageSrc,
      active: imageId === key,
      onClick: () => {
        setState((prevState) => {
          return {
            ...prevState,
            imageId: key
          };
        });
      }
    };
  });

  React.useEffect(() => {
    appElementClient.registerOnElementChange((appElement) => {
      setState(appElement ? appElement.data : initialState);
    });
  }, []);


  const [options, setOptions] = useState<Options>({
    width: 300,
    height: 300,
    type: "svg" as DrawType,
    data: "http://qr-code-styling.com",
    image: "/favicon.ico",
    margin: 10,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "Q" as ErrorCorrectionLevel
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 20,
      crossOrigin: "anonymous"
    },
    dotsOptions: {
      color: "#222222",
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 0,
      //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
      // },
      type: "rounded" as DotType
    },
    backgroundOptions: {
      color: "#5FD4F3"
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 0,
      //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
      // },
    },
    cornersSquareOptions: {
      color: "#222222",
      type: "extra-rounded" as CornerSquareType
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 180,
      //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
      // },
    },
    cornersDotOptions: {
      color: "#222222",
      type: "dot" as CornerDotType
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 180,
      //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
      // },
    }
  });

  const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));


  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="3u">
        <Text>
          This example demonstrates how apps can create image elements inside
          app elements. This makes the element re-editable and lets apps control
          additional properties, such as the width and height.
        </Text>
        <FormField
          label="Select an image"
          control={(props) => (
            <Box id={props.id} paddingTop="1u">
              <div className={styles.thumbnailGrid}>
                {items.map((item) => (
                  <img
                    className={clsx(
                      styles.thumbnail,
                      item.active && styles.active
                    )}
                    key={item.key}
                    src={item.imageSrc}
                    onClick={item.onClick}
                    alt={item.title}
                  />
                ))}
              </div>
            </Box>
          )}
        />
      </Rows>
      <Rows spacing="2u">
        <FormField
          label="Data URL"
          value={images[imageId].imageSrc}
          control={(props) => <TextInput {...props} onChange={() => {
          }} />}
        />
        <FormField
          label="Width"
          value={width}
          control={(props) => (
            <NumberInput
              {...props}
              min={1}
              onChange={(value) => {
                setState((prevState) => {
                  return {
                    ...prevState,
                    width: Number(value || 0)
                  };
                });
              }}
            />
          )}
        />
        <FormField
          label="Height"
          value={height}
          control={(props) => (
            <NumberInput
              {...props}
              min={1}
              onChange={(value) => {
                setState((prevState) => {
                  return {
                    ...prevState,
                    height: Number(value || 0)
                  };
                });
              }}
            />
          )}
        />
        <FormField
          label="Rotation"
          value={rotation}
          control={(props) => (
            <NumberInput
              {...props}
              min={-180}
              max={180}
              onChange={(value) => {
                setState((prevState) => {
                  return {
                    ...prevState,
                    rotation: Number(value || 0)
                  };
                });
              }}
            />
          )}
        />
        <Button
          variant="primary"
          onClick={async () => {
            // console.debug('add qr code')
            const rawData = await qrCode.getRawData('svg');
            const dataUrl = await blobToBase64(rawData as unknown as Blob)
            console.debug('add qr code', dataUrl, rawData)
            appElementClient.addOrUpdateElement({
              type: "IMAGE",
              top: 0,
              left: 0,
              dataUrl,
            });
            console.debug('add qr code done', dataUrl, rawData)
          }}
          disabled={disabled}
          stretch
        >
          Add Cut QR Code to design
        </Button>
      </Rows>
    </div>
  );
};
