import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import './Spinner.scss';

const Spinner = props => {
  const { type } = props;

  const [spinner, setSpinner] = useState(null);

  useEffect(() => {
    switch (type) {
      case 'NO_BORDER_SPINNER':
        setSpinner(<div className="nb-spinner" />);
        break;
      case 'BORDER_TOP_SPINNER':
        setSpinner(<div className="bt-spinner" />);
        break;
      case 'DOUBLE_BORDER_SPINNER':
        setSpinner(<div className="db-spinner" />);
        break;
      case 'DOUBLE_SPINNERS':
        setSpinner(
          <>
            <div className="dbl-spinner" />
            <div className="dbl-spinner dbl-spinner--2" />
          </>
        );
        break;
      case 'REVERSE_SPINNER': // 3
        setSpinner(<div className="reverse-spinner" />);
        break;
      case 'HM_SPINNER':
        setSpinner(<div className="hm-spinner" />);
        break;
      case 'TRIPLE_SPINNER': // 1
        setSpinner(<div className="triple-spinner" />);
        break;
      case 'CM_SPINNER': // 2
        setSpinner(<div className="cm-spinner" />);
        break;
      case 'MULTI_SPINNER': // 4
        setSpinner(
          <div className="multi-spinner-container">
            <div className="multi-spinner">
              <div className="multi-spinner">
                <div className="multi-spinner">
                  <div className="multi-spinner">
                    <div className="multi-spinner">
                      <div className="multi-spinner" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case '3_DOT_LOADER':
        setSpinner(
          <>
            <div className="dot-loader" />
            <div className="dot-loader dot-loader--2" />
            <div className="dot-loader dot-loader--3" />
          </>
        );
        break;
      case 'CIRCLE_DOT_LOADER':
        setSpinner(
          <div className="circle-loader">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        );
        break;
      case 'SPINNER_13':
        setSpinner(
          <div className="ml-loader">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        );
        break;
      case 'MESH_LOADER':
        setSpinner(
          <div className="mesh-loader">
            <div className="set-one">
              <div className="circle" />
              <div className="circle" />
            </div>
            <div className="set-two">
              <div className="circle" />
              <div className="circle" />
            </div>
          </div>
        );
        break;
      case 'HEART_LOADER':
        setSpinner(<div className="heart-loader" />);
        break;
      case 'TRI_FORCE_LOADER':
        setSpinner(
          <div className="triforce-container">
            <div className="triforce" />
          </div>
        );
        break;
      default:
        setSpinner('Loading...');
    }
  }, [type]);

  return <div className="spinner-container">{spinner}</div>;
};

export default Spinner;

Spinner.propTypes = {
  type: string.isRequired
};
