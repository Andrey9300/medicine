import React, {Component} from 'react';
import {Row, Col, Card, CardBlock, CardHeader, NavLink} from 'reactstrap';

class ActivateAccount extends Component {
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6" md="4">
                        <Card className="text-center">
                            <CardHeader>
                                Вы активировали email
                            </CardHeader>
                            <CardBlock>
                                <NavLink href="#/legalEntities/create" className={'active'}>
                                    Добавить юридическое лицо
                                </NavLink>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ActivateAccount;
