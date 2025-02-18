import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useConfirmAccountDeletionMutation } from '../redux/api/userApiSlice';
import { logout } from '../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';

const VerifyDeletion = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmDeletion] = useConfirmAccountDeletionMutation();
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        const verifyDeletion = async () => {
            try {
                await confirmDeletion(token).unwrap();
                dispatch(logout());
                toast.success('Your account has been successfully deleted');
                navigate('/');
            } catch (err) {
                toast.error(err?.data?.message || 'Failed to delete account');
                navigate('/profile');
            } finally {
                setIsProcessing(false);
            }
        };

        verifyDeletion();
    }, [token, confirmDeletion, navigate, dispatch]);

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            {isProcessing && (
                <div className="text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">Verifying deletion request...</h2>
                    <p>Please wait while we process your request.</p>
                </div>
            )}
        </div>
    );
};

export default VerifyDeletion; 