import React, {Component} from 'react';
import {Row, Col, Card, CardBlock, CardHeader} from 'reactstrap';

class ActivateAccount extends Component {
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6" md="4">
                        <Card className="text-white bg-success text-center">
                            <CardHeader>
                                Вы активировали email
                            </CardHeader>
                            <CardBlock>
                                <blockquote className="card-bodyquote">
                                    <button className="btn btn-primary btn-xs btn-block">
                                        Перейти к заполнению информации
                                    </button>
                                </blockquote>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ActivateAccount;
