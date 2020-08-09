import React from 'react';
import {
  clearPestUnit,
  deletePestUnit,
  fetchPestUnitCurrent,
} from '../../../actions/pest/unitActions';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import {createMarkup} from '../../../utils/errorsHelper';
import {IPestUnit} from '../../../interface/pest/IPestUnit';

interface IPestUnitStateProps {
  pestUnit: IPestUnit;
  fetched?: boolean;
  errors?: any;
}

export interface IPestUnitDispatchProps {
  clearPestUnit?: typeof clearPestUnit;
  fetchPestUnitCurrent?: typeof fetchPestUnitCurrent;
  deletePestUnit?: typeof deletePestUnit;
}

interface IPestUnitProps extends IPestUnitStateProps, IPestUnitDispatchProps {}

export class PestUnitComponent extends React.PureComponent<IPestUnitProps> {
  componentDidMount() {
    const {clearPestUnit, fetchPestUnitCurrent} = this.props;

    clearPestUnit();
    fetchPestUnitCurrent();
  }

  handleBtnDelete = (id: number, event: any) => {
    event.preventDefault();
    const {deletePestUnit} = this.props;

    const result = confirm(
      'Удаление приведет к потере данных аудита по этой точке и потере самой точки. Удалить?',
    );

    if (result) {
      deletePestUnit(id);
    }
  };

  render() {
    const {pestUnit, errors} = this.props;
    let errorsMessage = null;

    if (!pestUnit) {
      return null;
    }

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    return (
      <Row>
        <Col xs="12" sm="12" md="8" lg="8" xl="8">
          <Card>
            {errorsMessage}
            <CardHeader>
              <i className="fa fa-building-o" aria-hidden="true" />
              Объект
              <Link
                to={`/services/pest/units/edit`}
                style={{
                  marginLeft: '18px',
                }}
              >
                <i className="fa fa-pencil" />
              </Link>
              <span
                className="pull-right"
                onClick={(event) => this.handleBtnDelete(pestUnit.id, event)}
              >
                <i className="fa fa-trash" />
              </span>
            </CardHeader>
            <CardBody className="card-body">
              <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
                <Col>Наименование:</Col>
                <Col>{pestUnit.name}</Col>
              </Row>
              <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
                <Col>Менеджер:</Col>
                <Col>{pestUnit.manager}</Col>
              </Row>
              <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
                <Col>Проверяющая организация:</Col>
                <Col>{pestUnit.check_organization}</Col>
              </Row>
              {pestUnit.files.length > 0 && (
                <Row
                  style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}
                >
                  <Col>Файлы</Col>
                  <Col>
                    {pestUnit.files.map((file, index) => (
                      <>
                        <a href={file.link} key={index} target="_blank">
                          {file.name}
                        </a>
                        <br />
                      </>
                    ))}
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
