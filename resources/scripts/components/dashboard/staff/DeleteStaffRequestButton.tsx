import React, { useState } from 'react';
import { Actions, useStoreActions } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import { httpErrorToHuman } from '@/api/http';
import Button from '@/components/elements/Button';
import ConfirmationModal from '@/components/elements/ConfirmationModal';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import deleteStaffRequest from '@/api/staff/deleteStaffRequest';

interface Props {
    id: number;
    onDeleted: () => void;
}

export default ({ id, onDeleted }: Props) => {
    const [ visible, setVisible ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const { addError, clearFlashes } = useStoreActions((actions: Actions<ApplicationStore>) => actions.flashes);

    const onDelete = () => {
        setIsLoading(true);
        clearFlashes('staff');
        clearFlashes('staff:create');

        deleteStaffRequest(id)
            .then(() => {
                setIsLoading(false);
                setVisible(false);
                onDeleted();
            })
            .catch(error => {
                addError({ key: 'staff', message: httpErrorToHuman(error) });
                setIsLoading(false);
                setVisible(false);
            });
    };

    return (
        <>
            <ConfirmationModal
                visible={visible}
                title={'Delete request?'}
                buttonText={'Yes, delete request'}
                onConfirmed={onDelete}
                showSpinnerOverlay={isLoading}
                onModalDismissed={() => setVisible(false)}
            >
                Are you sure you want to delete this request?
            </ConfirmationModal>
            <Button color={'red'} size={'xsmall'} onClick={() => setVisible(true)}>
                <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
        </>
    );
};
